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
