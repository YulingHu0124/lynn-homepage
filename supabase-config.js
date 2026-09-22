/* ===== 反馈后台配置（Supabase）=====
 *
 * 这个文件里只放「可以公开」的信息：
 *   - url            ：Supabase 项目地址（Project Settings → Data API → Project URL）
 *   - publishableKey ：可公开的客户端密钥（旧称 anon key）
 *                     能做什么完全由数据库的 RLS 策略决定 —— 当前策略只允许「新增一条反馈」，
 *                     读 / 改 / 删一律被数据库拒绝，所以放在前端是安全的。
 *
 * ⚠️ 绝对不要写进来（也不要提交到 GitHub）：
 *   - service_role key / secret key —— 可以绕过 RLS，等于数据库的万能钥匙
 *   - 数据库密码、SMTP 授权码、.env 里的任何内容
 *
 * 怎么填：登录 Supabase → 你的项目 → Project Settings → API，复制上面两个值填到下面，
 * 保存后刷新页面即可生效（不需要改 index.html）。
 *
 * 没填时会怎样：本地开发自动回退到 server.py 的 /api/feedback（写进 data/feedback.jsonl），
 * 纯静态托管（GitHub Pages）上会显示「反馈后台正在配置中」的友好提示，不会报错。
 */
window.SUPABASE_CONFIG = {
  url: 'https://bfixnmaqqmqijpomxvfi.supabase.co',              // 例：'https://abcdefghijklm.supabase.co'
  publishableKey: 'sb_publishable_wNFmXUUP2YutzuvI6ABPig_KfcQrdww',   // 例：'sb_publishable_xxxxxxxxxxxx'  或旧版 'eyJhbGciOi...'（anon key）
  version: 'v3.0'       // 随每条反馈一起存，方便日后按版本区分
};

/* ===== 邮件通知（Web3Forms）=====
 * 线上（GitHub Pages / Netlify）没有服务器：访客的推荐与反馈只会写进 Supabase 表，
 * 你得自己登后台才看得到。填上 Web3Forms 的 Access Key 之后，访客每提交一次，
 * 就同时给你邮箱发一封信，第一时间就能收到。
 *
 * 怎么拿：打开 https://web3forms.com/ → 填你的收件邮箱 → 收到的邮件里就有 Access Key
 *         （免费额度每月 250 封，个人主页完全够用）。
 * 免费版没有域名白名单（Trusted Domains 属于付费功能），这个 key 被看到也不必紧张：
 * 它只能用来往你的收件邮箱发信，拿不到任何数据；万一被滥发，在 Web3Forms 后台换一个 key 即可。
 *
 * 留空 = 不发邮件，站点一切照常，仍然只在 Supabase 后台看。
 * 这个 key 是设计给前端用的公开 key，写在这里是安全的；但绝不要在这里写邮箱密码或 SMTP 授权码。
 */
window.WEB3FORMS_ACCESS_KEY = '96f22473-2362-455f-84d8-4d871c7a1a62';   // 与收件邮箱绑定；免费额度 250 封/月

/* 给站长发一封信。任何失败都静默吞掉，绝不能影响访客的提交体验。 */
window.notifyStationMaster = function(subject, message){
  try{
    var key = String(window.WEB3FORMS_ACCESS_KEY || '').trim();
    if(!key) return;                                   // 未配置 → 什么都不做
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: subject,
        from_name: 'Fledglynn 个人主页',
        message: message
      }),
      keepalive: true
    }).catch(function(){});
  }catch(e){}
};
