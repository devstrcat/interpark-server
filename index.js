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
app.get("/recommend1", (req, res) => {
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
app.get("/recommend2", (req, res) => {
  const result = {
    total: 12,
    recommend_1: {
      file: "images/recommend/r2_1.jpg",
      url: "a.html",
      p: "[쇼핑앱특가] (인앱특가 3,990원/병당333원) 아이팝 무라벨 먹는샘물 생수 2L*12펫 / 하이트진로",
      discount: 17,
      price: 5690,
    },
    recommend_2: {
      file: "images/recommend/r2_2.jpg",
      url: "b.html",
      p: "[산지직송] 국내산 햇 양파 5kg 3kg 특대 (2개사면 1kg 추가증정)",
      discount: 0,
      price: 7900,
    },
    recommend_3: {
      file: "images/recommend/r2_3.jpg",
      url: "c.html",
      p: "[산지직송] 포항 구룡포 제철 꽁치 과메기 및 야채세트 모음전!",
      discount: 8,
      price: 10830,
    },
    recommend_4: {
      file: "images/recommend/r2_4.jpg",
      url: "d.html",
      p: "[청구할인6%]  23년산 햅쌀 10kg 골라담기, 진품경기미/수향미특/경기추청/이천",
      discount: 3,
      price: 31500,
    },
    recommend_5: {
      file: "images/recommend/r2_5.jpg",
      url: "e.html",
      p: "[쇼핑앱추가쿠폰] 해태 포키 극세4+블루베리2+딸기2 /극세 44g * 8 / 빼빼로데이 / 특별한 날엔 포키",
      discount: 26,
      price: 9900,
    },
    recommend_6: {
      file: "images/recommend/r2_6.png",
      url: "f.html",
      p: "산지직송 초간편 자연산 손질오징어 1kg (7미-8미)",
      discount: 12,
      price: 15560,
    },
    recommend_7: {
      file: "images/recommend/r2_7.jpg",
      url: "b.html",
      p: "바다원 어포튀각 110g*5봉",
      discount: 4,
      price: 23900,
    },
    recommend_8: {
      file: "images/recommend/r2_8.jpg",
      url: "c.html",
      p: "팸퍼스 베이비드라이 팬티 밴드 1박스 기저귀",
      discount: 0,
      price: 68900,
    },
    recommend_9: {
      file: "images/recommend/r2_9.jpg",
      url: "d.html",
      p: "23년 제철 국내산 태안 자연산 활 꽃게 3kg 당일조업 조업즉시발송 톱밥포장 빙장포장 (키로당 3-5미)",
      discount: 2,
      price: 33900,
    },
    recommend_10: {
      file: "images/recommend/r2_10.jpg",
      url: "d.html",
      p: "[11/7 오쎈 다운로드쿠폰가 7,670원] 크리오 쿨 맥스 민트 치약 100g x8개 민트/스트롱 민트 택1_I",
      discount: 12,
      price: 11230,
    },
    recommend_11: {
      file: "images/recommend/r2_11.jpg",
      url: "d.html",
      p: "[컬쳐랜드] 모바일 문화상품권 1만원권_카드가능",
      discount: 3,
      price: 9700,
    },
    recommend_12: {
      file: "images/recommend/r2_12.jpg",
      url: "d.html",
      p: "[특가]전병 (1kg +1kg ) 옛날과자 센베이 오란다 고급전병(실중량)",
      discount: 20,
      price: 10960,
    },
  };
  res.send(result);
});
app.get("/recommend3", (req, res) => {
  const result = {
    total: 12,
    recommend_1: {
      file: "images/recommend/r3_1.jpg",
      url: "a.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 사골곰탕500g(실온)",
      discount: 0,
      price: 1900,
    },
    recommend_2: {
      file: "images/recommend/r3_2.jpg",
      url: "b.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 하우촌 오장동 냉면 1인분 물냉면 비빔냉면",
      discount: 0,
      price: 2900,
    },
    recommend_3: {
      file: "images/recommend/r3_3.jpg",
      url: "c.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 국내산 사골곰탕 500g 외 실온 국 탕 반찬 25종 모음",
      discount: 0,
      price: 1900,
    },
    recommend_4: {
      file: "images/recommend/r3_4.jpg",
      url: "d.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 프리미엄 궁중찜닭 450g (실온)",
      discount: 10,
      price: 6300,
    },
    recommend_5: {
      file: "images/recommend/r3_5.jpg",
      url: "e.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 소고기미역국500g(실온)",
      discount: 10,
      price: 4950,
    },
    recommend_6: {
      file: "images/recommend/r3_6.jpg",
      url: "f.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 육개장500g(실온)",
      discount: 10,
      price: 4950,
    },
    recommend_7: {
      file: "images/recommend/r3_7.jpg",
      url: "b.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 고추장찌개500g(실온)",
      discount: 10,
      price: 4950,
    },
    recommend_8: {
      file: "images/recommend/r3_8.jpg",
      url: "c.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 차돌된장찌개500g(실온)",
      discount: 10,
      price: 4950,
    },
    recommend_9: {
      file: "images/recommend/r3_9.jpg",
      url: "d.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 프리미엄 닭볶음탕 450g(실온)",
      discount: 10,
      price: 6300,
    },
    recommend_10: {
      file: "images/recommend/r3_10.jpg",
      url: "d.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 소고기장조림130g(실온)",
      discount: 10,
      price: 4950,
    },
    recommend_11: {
      file: "images/recommend/r3_11.jpg",
      url: "d.html",
      p: "★추가 3% 다운로드 쿠폰★ 교동 프리미엄 순살 갈비탕 450g(실온)",
      discount: 10,
      price: 6300,
    },
    recommend_12: {
      file: "",
      url: "d.html",
    },
  };
  res.send(result);
});
app.get("/recommend4", (req, res) => {
  const result = {
    total: 12,
    recommend_1: {
      file: "images/recommend/r4_1.jpg",
      url: "a.html",
      p: "삼성전자 양문형냉장고 852L RS84B5001CW 가정용냉장고 [소상공인제품]",
      discount: 10,
      price: 1156820,
    },
    recommend_2: {
      file: "images/recommend/r4_2.jpg",
      url: "b.html",
      p: "삼성전자 냉동고 ZRS25LSLH 247L 가정용 업소용 무료배송 무료설치 /",
      discount: 10,
      price: 523530,
    },
    recommend_3: {
      file: "images/recommend/r4_3.jpg",
      url: "c.html",
      p: "캐리어 클라윈드 KRFT-122ABPWO 최신상 미니(소형) 일반냉장고 저소음 2도어 122L 전국배송 빠른설치",
      discount: 15,
      price: 204000,
    },
    recommend_4: {
      file: "images/recommend/r4_4.jpg",
      url: "d.html",
      p: "LG전자 울트라HD 스마트 TV 55UQ7070 55인치 A",
      discount: 5,
      price: 578550,
    },
    recommend_5: {
      file: "images/recommend/r4_5.jpg",
      url: "e.html",
      p: "쿠쿠 CRP-ST1010FW 10인용 트윈프레셔 전기압력밥솥 공식판매점 SJ",
      discount: 14,
      price: 201670,
    },
    recommend_6: {
      file: "images/recommend/r4_6.jpg",
      url: "f.html",
      p: "2023 일월 온수매트 모음전/다양한 모델과 크기 선택 일월매트 일월온수매트",
      discount: 29,
      price: 87200,
    },
    recommend_7: {
      file: "images/recommend/r4_7.jpg",
      url: "b.html",
      p: "[한정 특가] 일월 더마루 골드에디션 전기 카페트 매트 특대형/카본매트 일월매트 LX하우시스 친환경원단",
      discount: 20,
      price: 180000,
    },
    recommend_8: {
      file: "images/recommend/r4_8.jpg",
      url: "c.html",
      p: "캐리어 KRFT-249ATMSW 미니(소형) 원룸 일반냉장고 간접냉각 저소음 실버 249L 전국배송 빠른설치",
      discount: 15,
      price: 327000,
    },
    recommend_9: {
      file: "images/recommend/r4_9.jpg",
      url: "d.html",
      p: "LG전자 울트라HD 86UQ7590 스마트 TV 86인치 A",
      discount: 5,
      price: 1951300,
    },
    recommend_10: {
      file: "images/recommend/r4_10.jpg",
      url: "d.html",
      p: "삼성 2구 인덕션 더플레이트 NZ60R7703PW 화이트 (소상공인제품) /",
      discount: 12,
      price: 227920,
    },
    recommend_11: {
      file: "images/recommend/r4_11.jpg",
      url: "d.html",
      p: "삼성 무선청소기 제트 150W  VS15A6031N5 [소상공인제품]/",
      discount: 12,
      price: 333520,
    },
    recommend_12: {
      file: "",
      url: "d.html",
    },
  };
  res.send(result);
});

app.get("/tour", (req, res) => {
  const result = {
    total: 9,
    tour_1: {
      file: "images/tour/tour1.jpg",
      url: "a.html",
      box: "국적기직항",
      blue: "인솔자 동행, 선택관광 All 포함",
      p: "[스페인 포르투갈10일]2대 야경,3대 자유시간,포루투 완전정복",
      price: 3999000,
    },
    tour_2: {
      file: "images/tour/tour2.jpg",
      url: "b.html",
      box: "베스트셀러",
      blue: "소아 동반 인기상품",
      p: "[푸꾸옥 자유 3박5일] 5성급 노보텔리조트 숙박",
      price: 619000,
    },
    tour_3: {
      file: "images/tour/tour3.jpg",
      url: "c.html",
      box: "방콕",
      blue: "2022년 오픈한 신상 럭셔리 호텔",
      p: "차트리움 그랜드 방콕",
      price: 285389,
    },
    tour_4: {
      file: "images/tour/tour4.jpg",
      url: "d.html",
      box: "NO쇼핑",
      blue: "2인이상 출발, 가이드팁포함",
      p: "[하와이/시내관광+자유일정] 와이키키 리조트 6일/7일",
      price: 2040000,
    },
    tour_5: {
      file: "images/tour/tour5.jpg",
      url: "e.html",
      box: "올인클루시브",
      blue: "얼리 체크인 or 레이트 체크아웃 포함",
      p: "[스완도르 깜란/올인클루시브] 나트랑 자유여행",
      price: 560000,
    },
    tour_6: {
      file: "images/tour/tour6.jpg",
      url: "f.html",
      box: "기획특가",
      blue: "F/W 시즌 패키지",
      p: "[서유럽10일]프랑스/스위스/이탈리아,루브르박물관, 바티칸, 융프라우,핀에어",
      price: 2599000,
    },
    tour_7: {
      file: "images/tour/tour7.jpg",
      url: "b.html",
      box: "코타키나발루",
      blue: "5성급, 선셋 명소 탄중아루 해변 위치",
      p: "샹그릴라 탄중아루 리조트 앤드 소파",
      price: 219234,
    },
    tour_8: {
      file: "images/tour/tour8.jpg",
      url: "c.html",
      box: "파리",
      blue: "파리15구, 위치&가성비",
      p: "호텔 투어리즘 애비뉴",
      price: 277820,
    },
    tour_9: {
      file: "images/tour/tour9.jpg",
      url: "d.html",
      box: "강력특가",
      blue: "슈페리어 더블, 시티뷰",
      p: "SL호텔 강릉",
      price: 68600,
    },
  };
  res.send(result);
});

// 서버에서 Request 요청대기
app.listen(port, () => {
  console.log(`현재 웹서버가 ${port} 로 접속하였습니다.`);
});
