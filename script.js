/* =========================================================
   ✏️ 老闆要改的東西都在這一區
   改完存檔、重新整理網頁就會看到
   ========================================================= */
const SETTINGS = {
  // 訂購表單網址（Apps Script 部署後的 .../exec 網址，貼在引號中間）
  orderUrl: 'https://script.google.com/macros/s/AKfycbwWHCKlVBzPapxCwcoCak_NzDel9E4NJKZ9kCqIFjAKXBeJUSb-SYtAPbtPjU1z8Mi_/exec',

  // LINE 官方帳號連結，例如 'https://lin.ee/xxxxxxx'
  lineUrl: '',

  // Instagram 網址，例如 'https://www.instagram.com/你的帳號'
  igUrl: ''
};

// 商品清單：改價格、改介紹、換照片都在這裡
// 換照片：把照片放進 images/ 資料夾，再把 image 改成新檔名（例如 'images/shrimp_chive.jpg'）
const PRODUCTS = [
  { name: '韭菜鮮蝦水餃',       emoji: '🦐', badge: '人氣 No.1', price: 360, unit: '包', size: '30 顆', desc: '整尾鮮蝦配上韭菜香，一口咬下都是蝦的彈牙。', image: 'images/shrimp_chive.svg' },
  { name: '高麗菜鮮蝦水餃',     emoji: '🦐', badge: '第二團新增', price: 390, unit: '包', size: '30 顆', desc: '高麗菜的清甜遇上鮮蝦，湯汁多到要小心燙口。', image: 'images/shrimp_cabbage.svg' },
  { name: '韭菜黑豬肉水餃',     emoji: '🥟', badge: '',          price: 270, unit: '包', size: '30 顆', desc: '台灣黑豬肉＋韭菜，最經典、最有家的味道。', image: 'images/pork_chive.svg' },
  { name: '高麗菜黑豬肉水餃',   emoji: '🥟', badge: '',          price: 300, unit: '包', size: '30 顆', desc: '清甜高麗菜吸飽肉汁，大人小孩都愛。', image: 'images/pork_cabbage.svg' },
  { name: '剝皮辣椒黑豬肉水餃', emoji: '🌶️', badge: '新品登場',   price: 330, unit: '包', size: '30 顆', desc: '剝皮辣椒的甘甜微辣，越吃越涮嘴。', image: 'images/pepper_pork.svg' },
  { name: '干貝小魚乾辣椒醬',   emoji: '🐟', badge: '老饕必備',   price: 250, unit: '罐', size: '',          desc: '干貝＋小魚乾慢炒，沾水餃、拌麵、配飯都對味。', image: 'images/sauce.svg' }
];

/* =========================================================
   以下是程式，一般不用動
   ========================================================= */

// 畫出商品卡片
const grid = document.getElementById('productGrid');
grid.innerHTML = PRODUCTS.map(p => `
  <article class="product">
    <div class="product-photo">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
    </div>
    <div class="product-body">
      <h3>${p.emoji} ${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price-row">
        <span class="price">NT$ ${p.price}</span>
        <span class="unit">／${p.unit}${p.size ? '（' + p.size + '）' : ''}</span>
      </div>
    </div>
  </article>
`).join('');

// 把連結套到按鈕上；還沒填網址的話，按下去會跳提示
function setLink(selector, url, emptyMessage) {
  document.querySelectorAll(selector).forEach(a => {
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.href = '#';
      a.addEventListener('click', e => {
        e.preventDefault();
        alert(emptyMessage);
      });
    }
  });
}
setLink('.js-order', SETTINGS.orderUrl, '訂購表單即將開放，請先追蹤我們的 LINE 或 IG 等開團通知 💛');
setLink('.js-line', SETTINGS.lineUrl, 'LINE 連結準備中 🙏');
setLink('.js-ig', SETTINGS.igUrl, 'IG 連結準備中 🙏');

// 頁尾年份自動更新
document.getElementById('year').textContent = new Date().getFullYear();
