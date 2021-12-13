# 自行車道地圖資訊整合網 | [Demo](https://johnsonmao.github.io/youbike/)

## 作品說明

設計採用 [KT](https://www.behance.net/gallery/131133281/YouBike-Map-Project) 的設計稿

整合 [TDX 運輸資料流通服務](https://tdx.transportdata.tw/) API，實現查詢附近 Youbike 站點與附近自行車道的功能

## 系統說明

本專案使用 create-react-app ，並部署到 Github Pages，運行方式使用 `yarn` 下載依賴包， `yarn start` 運行

- Node 版本 v16.4.2
- yarn 版本 v1.22.11
- React 版本 v17.0.2
- React-router-dom 版本 v6.0.2

## 資料夾說明

```
|- /src
    |- /api：存放 API 串接整合資料
    |- /asset：Icon 與 SCSS
    |- /components：共用元件
    |- /pages：頁面
    |- /utils：通用工具 Hook、設置常數
```

## 使用技術

- React
- Leaflet
- BootStrap

## 第三方服務

- MapBox
