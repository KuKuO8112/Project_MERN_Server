# 記帳網站後端 server
此專案為使用 MERN 製作的簡易記帳網站的後端 server 部分，MERN 即為 React、node.js、Express、mongoDB，使用 node.js 作為後端語言，並使用 express 作為框架，部署至 render 運作，mongoDB 則為資料庫，並於 mongodb atlas 雲端上運作。  

## 使用套件

1. **bcrypt** ：使用 bcrypt 未密碼進行加密。  
   
2. **dotenv**：使用 .env 存放環境變數。  
   
3. **express**：後端框架。
   
4. **Joi**：Joi 能對前端傳送的資料做格式及資料類型的驗證，並產生錯誤訊息以傳送給前端。  
   
5. **JSON Web Token**：能將用戶資訊做簽名形成 token，並回傳給前端，作為瀏覽網站時的身分驗證。  
   
6. **mongoose**：透過 mongoose 連結 mongoDB，並對資料進行操作。  
   
7. **passport**：對使用者進行身分驗證，使其能對記帳資料做操作。  

## 基本功能鍵介紹
moudels 內 accounts 和 user moudels 作為 mongoose Schema，並建立 methods 進行密碼驗證等等。  
  
routes 內 auth-route 和 account-route， 接收前端的各種 request 及處理，並由 validation 內的 Joi 套件對資料型態及格式做驗證。  
  
config 內 passport 能對從前端獲得的 token 做驗證，以確認對資料進行操作的使用者身分。  
  
index 從 .env 取得網址再透過 mongoose 連接 mongoDB，並透過 passport 將 account route 保護起來。  
  

[前端 client](https://github.com/KuKuO8112/Project_MERN_Client "link")  
