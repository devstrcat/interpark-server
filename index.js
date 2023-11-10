// const express = require("express") ;  옛날 즉 commonjs 방식
import express from "express"; // 현대 방식 module 방식
import cors from "cors";
// 도움말 및 기능 테스트 Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const app = express();
const port = 4000; // 서버에 접속시 포트번호
// cors 처리(웹브라우저로 접속시 보안관련 처리)
app.use(
  cors({
    origin: "*",
  })
);

// json 데이터를 사용하겠다고 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger 설정
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// REST API 요청 처리
// 첫페이지
app.get("/", function (req, res) {
  res.send("인터파크 API");
});
// 게시판 API (백엔드 호출 함수)
// get 은 프론트에서 자료 요청
// localhost:4000/board : 게시판 자료를 요청.
app.get("/board", (req, res) => {
  console.log("GET", req);
  // DB 에서 조건을 보고 결과를 {} 만들어서 [] 담아서준다.
  // MongoDB, MaraiDB(MySql)
  const result = [
    {
      number: 1,
      writer: "철수",
      title: "제목입니다.",
      contents: "내용입니다.",
    },
    {
      number: 2,
      writer: "영희",
      title: "영희입니다.",
      contents: "내용입니다.",
    },
    {
      number: 3,
      writer: "훈희",
      title: "훈희입니다.",
      contents: "내용입니다.",
    },
  ];
  res.send(result);
});

// post 는 프론트에서 백엔드로 자료 전송
// localhost:4000/board : 게시판 자료를 추가한다.
// axios.post("/board", {자료})
app.post("/board", (req, res) => {
  // console.log("POST", req);
  console.log("BODY 프론트가 보낸 데이터 ", req.body);
  // req.body 를 바탕으로 DB 에 내용 추가
  res.send("게시물 추가에 성공하였습니다.");
});

// 인터파크 API (백엔드 호출 함수)
// visual 영역에 출력할 자료 요청
// localhost:4000/visual
app.get("/visual", (req, res) => {
  const result = {
    total: 6,
    visual_1: {
      file: "images/visual/v1.png",
      url: "a.html",
    },
    visual_2: {
      file: "images/visual/v2.jpg",
      url: "b.html",
    },
    visual_3: {
      file: "images/visual/v3.jpg",
      url: "c.html",
    },
    visual_4: {
      file: "images/visual/v4.jpg",
      url: "d.html",
    },
    visual_5: {
      file: "images/visual/v5.jpg",
      url: "e.html",
    },
    visual_6: {
      file: "images/visual/v6.png",
      url: "f.html",
    },
  };
  res.send(result);
});
// recommend 영역에 출력할 자료 요청
// localhost:4000/visual
app.get("/recommend", (req, res) => {
  const result = {
    total: 12,
    recommend_1: {
      file: "images/recommend/r1_1.jpg",
      url: "a.html",
      p: "[스포츠파크] 노스페이스 겨울 구스다운 패딩 슬립온 NS93M50",
      discount: 27,
      price: 7600,
    },
    recommend_2: {
      file: "images/recommend/r1_2.jpg",
      url: "b.html",
      p: "서울우유 멸균 초코/딸기/흰우유 24팩/48팩 외",
      discount: 38,
      price: 12500,
    },
    recommend_3: {
      file: "images/recommend/r1_3.jpg",
      url: "c.html",
      p: "[최종가 10,850원] 17~18브릭스 미니 꿀사과 엔비사과 2kg (5-9과/가정용/펜시등급)",
      discount: 0,
      price: 15500,
    },
    recommend_4: {
      file: "images/recommend/r1_4.png",
      url: "d.html",
      p: "[I*POP] 아이팝 스파클링 워터 플레인 / 아이팝 탄산수 / 강탄산 / 진짜 먹는 샘물로 만든 탄산수",
      discount: 22,
      price: 6900,
    },
    recommend_5: {
      file: "images/recommend/r1_5.jpg",
      url: "e.html",
      p: "큐라이프 니트릴장갑 200매 (색상 블랙, 화이트 / 사이즈 S, M, L 선택)",
      discount: 24,
      price: 7820,
    },
    recommend_6: {
      file: "images/recommend/r1_6.jpg",
      url: "f.html",
      p: "아모스 04 스타일 컬링 2X 에센스 150ml",
      discount: 22,
      price: 6400,
    },
    recommend_7: {
      file: "images/recommend/r1_7.jpg",
      url: "b.html",
      p: "[김혜자 세제] 프로쉬 공식몰 독일 식기세척기세제 그린레몬 50개입 2개+주방세제 1개+펌프 1개 증정",
      discount: 52,
      price: 32900,
    },
    recommend_8: {
      file: "images/recommend/r1_8.jpg",
      url: "c.html",
      p: "[스포츠파크 타임딜] 크록스 바야 라인드 퍼즈 스트랩 클로그 3종 택 1",
      discount: 28,
      price: 39000,
    },
    recommend_9: {
      file: "images/recommend/r1_9.jpg",
      url: "d.html",
      p: "윙잇 고른 토핑가득 부대찌개 800g*2개",
      discount: 16,
      price: 11210,
    },
    recommend_10: {
      file: "images/recommend/r1_10.jpg",
      url: "d.html",
      p: "[만원의행복] 호두앤 토핑호두과자 오리지널 40알 외 앙버터/누텔라/블루베리 혼합 골라담기",
      discount: 34,
      price: 5900,
    },
    recommend_11: {
      file: "images/recommend/r1_11.jpg",
      url: "d.html",
      p: "[스포츠파크] 불스원샷 7만키로(70000km) X 2개입",
      discount: 38,
      price: 19800,
    },
    recommend_12: {
      file: "",
      url: "d.html",
      discount: 0,
      price: 0,
    },
  };
  res.send(result);
});

// 서버에서 Request 요청대기
app.listen(port, () => {
  console.log(`현재 웹서버가 ${port} 로 접속하였습니다.`);
});
