import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

function pick(subject, group) {
  return subject.filter(item => group.includes(item))[0];
}

async function run() {
  const res = await fetch('https://appmedia.jp/fategrandorder/3569536');
  const html = await res.text();

  const dom = new JSDOM(html);
  const { document } = dom.window;
  const data = Array.from(document.querySelectorAll('tr.servant_single'))
    .map((tr) => {
      const { rarity, class_2, type_2, range, card, attribute } = tr.dataset;
      const attrs = attribute.split(',');
      const name = tr.querySelector('td > a').textContent;
      const url = tr.querySelector('td > a').href;
      const image = tr.querySelector('td > a > img').src;
      return {
        name,
        url,
        image,
        rarity,
        classe: class_2,
        type: type_2,
        range,
        card,
        element: pick(attrs, ['天', '地', '人', '星', '獣']),
        alignmentLC: pick(attrs, ['秩序', '中立', '混沌']),
        alignmentGE: pick(attrs, ['善', '中庸', '悪', '夏', '狂', '花嫁']),
        gender: pick(attrs, ['男性', '女性', '性別不詳']),
      };
    });

  process.stdout.write(JSON.stringify(data));
}

run();
