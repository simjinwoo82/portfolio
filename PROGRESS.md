# 작업 진행 상황 (다음 세션 이어하기용)

마지막 업데이트: 2026-09-01

## 완료된 것
- `PRD.md` — 최종 확정 PRD (요구사항 정의 전체 완료)
- 파일 구조 세팅 완료:
  - `index.html` — 전체 1페이지 구조(Header/Hero/About Me/Quote/Signature Dishes/Testimonials/Contact/Footer/맨위로버튼/레시피모달)
  - `css/tokens.css` — 디자인 토큰(색상·폰트·spacing 변수)
  - `css/base.css` — 리셋 + 공통 타이포/리빌 애니메이션
  - `css/main.css` — 전체 컴포넌트 스타일(nav, hero, about, expertise bar, quote, dish card, modal, testimonials swiper, footer, back-to-top)
  - `js/recipes-data.js` — 레시피 8종 데이터(사용자 제공 참고파일에서 추출)
  - `js/main.js` — 인터랙션 전체(스크롤스파이+스무스스크롤, 헤더 섀도, 리빌 애니메이션, expertise 퍼센트바 애니메이션, 레시피 모달, 맨위로 버튼, Swiper 초기화, 모바일 내비 토글)
  - `assets/images/dishes/*.jpg` — 실제 요리 사진 8장 (참고파일 portfolio_site.html에서 추출한 base64 이미지)
- **히어로 듀오 사진 2장 완료** — `D:\포트폴리오다운로드\최종.png`(피그마 최종 목업 풀샷 스크린샷, 10722×23224px, Dev Mode 대체 자료로 확인)에서 실제 셰프복/슈트 사진을 크롭해 `assets/images/hero/practitioner.jpg`, `assets/images/hero/judge-expert.jpg`로 저장하고 `index.html`에 연결함. Quote 섹션 아바타도 같은 사진에서 얼굴 크롭(`assets/images/hero/quote-avatar.jpg`)해 플레이스홀더 이모지 대체.
- **디자인 토큰 색상 보정 완료** — `최종.png`를 픽셀 샘플링해 실제 피그마 렌더링 색상과 대조·수정(콘텐츠/퍼센트/설명 문구는 `portfolio_site.html` 그대로 유지, 색상만 보정 — 사용자 확인 완료):
  - `--color-navy`: `#14151C` → `#252436` (테스티모니얼 배경·버튼 배경 실측값)
  - `--color-navy-2`: `#1D1F29` → `#2E2D42` (테스티모니얼 카드 배경 실측값)
  - `--color-violet`: `#8B7FE8` → `#8B00FF` (테스티모니얼 포인트·CTA 타이틀 실측값)
  - `--color-olive`: `#5B6B45` → `#47BA78` (Expertise 배지 등 실제로는 그린 계열이었음, 변수명은 유지)
  - Expertise 카테고리별 스와치 신규 추가(`--color-cat-western/chinese/korean/bakery/barista/management`) — 피그마에는 항목마다 다른 색 점+막대가 있었는데 기존 구현은 단일 올리브→러스트 그라데이션이었음. 각 `.exp-row`에 `data-cat` 속성 추가하고 라벨 앞에 색 점(`.exp-row__dot`) 렌더링, 막대 색상도 카테고리별로 분리.
  - `.hero__title em` 러스트 색상 제거(피그마는 검정 볼드였음), `.btn`/`.btn:hover` 배경 잉크→네이비로 변경, `.hero__duo-label .x` 러스트→중립 회색 + 글리프 "×"→"|", `.quote-section__mark`/`.quote-section__text` 러스트→중립/네이비, `.cta-section__title` 러스트→바이올렛
- **모바일 내비게이션 햄버거 메뉴 신규 구현** — 반응형 점검 중 발견: 760px 이하에서 `.nav__links`가 `display:none`으로 완전히 사라지고 대체 UI가 전혀 없어 모바일 사용자가 내비게이션을 이용할 수 없는 상태였음. 햄버거 버튼(`#navToggle`) + 드롭다운 패널 + JS 토글(열림/닫힘, 링크 클릭 시 자동 닫힘, ESC로 닫힘, aria-expanded 갱신) 추가로 해결.
- **레시피 카드 키보드 접근성 수정** — `.dish-card`가 `<article>`이라 클릭 핸들러만 있고 키보드로 포커스/실행이 불가능했음. `tabindex="0"`, `role="button"`, 동적 `aria-label`, Enter/Space 키 핸들러 추가. 모달 열릴 때 닫기 버튼으로 포커스 이동, 닫힐 때 트리거 요소로 포커스 복귀하도록 처리.
- **반응형 점검 완료(데스크톱 1440 / 태블릿 768 / 모바일 390)** — Playwright(로컬 Chrome 채널, headless)로 3개 뷰포트 전체 스크린샷 확인. 레이아웃 깨짐 없음, 가로 스크롤 없음(scrollWidth==clientWidth 확인), 콘솔 에러 없음(favicon 404만 존재, 무해).

## 로컬 확인 방법
```
cd "C:\Users\PC\Desktop\portfolio"
python3 -m http.server 8730
# 브라우저에서 http://localhost:8730/index.html 접속
```
Claude-in-Chrome 확장이 연결 안 되어 있으면(`tabs_context_mcp` 실패), 대안으로 Playwright + 로컬 설치된 Chrome(`channel="chrome"`)을 헤드리스로 띄워 스크린샷/콘솔/네트워크 검증 가능(playwright 브라우저 자동 다운로드는 인터넷 차단으로 실패하므로 반드시 `channel="chrome"` 옵션 사용).

## 아직 안 된 것 / 다음에 이어할 일
1. ~~피그마 실제 콘텐츠와의 구조적 차이~~ — **처리 완료(2026-09-01)**: 히어로 상단 "20-Year Veteran Chef" eyebrow 텍스트는 피그마 실제 목업엔 없고(`hero__duo-sub`의 "SIM JIN WOO — 20-YEAR VETERAN CHEF"와 중복이기도 함) 제거함(`index.html`/`css/main.css`). 내비게이션의 "AI Kitchen" 메뉴 추가는 사용자 지시로 **적용하지 않음** — 현재 7개 메뉴(PRD 기준) 그대로 유지.
2. ~~PRD에서 언급된 피그마 원본 섹션(Services 소개 / Team / Logo bar)~~ — **확인 완료(2026-09-01), 추가 불필요**: `최종.png`(피그마 최종 렌더링 풀샷)을 끝까지 재확인한 결과 실제 조립된 최종 페이지는 Header→Hero→About Me→Quote→Signature Dishes→Testimonials→CTA/Footer로 섹션 간 끊김 없이 이어지며, Services 소개·Team·Logo bar 섹션은 존재하지 않음. PRD의 11개 섹션 목록은 피그마 파일 내 미사용 템플릿/참고 프레임(레이어명)까지 스캔해 나온 것으로 판단됨 — 현재 구현이 이미 실제 최종 디자인과 구조적으로 일치하므로 추가 작업 없음.
3. ~~접근성 심화 점검~~ — **완료(2026-09-01)**: 전체 인터랙티브 요소(nav 링크, 버튼, 레시피 카드, 모달 닫기, 맨위로, swiper 페이지네이션/버튼)에 `:focus-visible` 아웃라인 스타일 추가. WCAG AA 대비비(4.5:1) 계산해서 미달 항목 수정 — Expertise 배지 흰 글자(2.45:1)→잉크색(5.83:1), 테스티모니얼 카드 작성자명(3.96:1)→밝게(4.81:1), 카피라이트 텍스트(2.14:1)→ink-soft 재사용(5.33:1). 나머지 주요 텍스트/배경 조합은 모두 AA 통과 확인.
4. **배포** — 아직 GitHub Pages 등에 배포하지 않음(PRD에서는 GitHub Pages로 확정). 진행 중: 사용자가 이미 만들어둔 빈 GitHub 저장소(계정 simjinwoo82)로 배포할 예정 — **저장소 이름 확인 대기 중**(`https://github.com/simjinwoo82/<repo>.git`).

## 이번 세션 추가 수정 (2026-09-01, 배포 착수 전)
- **히어로 듀오 사진 크롭 버그 수정** — 원본 사진이 세로로 매우 긴 비율(683×1300, 698×1300)인데 `.hero__duo-panel`은 4:5 비율이라 `object-fit: cover` 기본 중앙 정렬 크롭 시 얼굴 윗부분(눈썹까지)이 잘려 보이는 문제 발견. `css/main.css`의 `.hero__duo-panel img`에 `object-position: top center` 추가해 상단(얼굴) 기준으로 크롭되도록 수정 — 데스크톱/모바일 모두 확인 완료.
- **전체 서체를 Pretendard로 통일(사용자 요청)** — `index.html`의 Google Fonts(Fraunces + Work Sans) 링크를 Pretendard CDN(`cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9`)으로 교체하고, `css/tokens.css`의 `--font-heading`/`--font-body` 둘 다 `'Pretendard', -apple-system, sans-serif`로 변경. 모든 font-family 선언이 이 두 토큰을 참조하도록 이미 되어 있어 파일 두 곳 수정만으로 전체 적용 확인.
- **About Me 연도/기간 텍스트 폰트 크기 통일(사용자 요청)** — 학력/자격/경력 3개 리스트의 `.timeline-list .period`가 `var(--fs-label)`(12.5px)로 라벨 텍스트보다 작게 표시되던 것을 `16px` 고정값으로 변경. 27개 항목 전부 동일 클래스라 CSS 한 줄 수정으로 통일됨.
- **한글 텍스트 전체 16px 미만 → 16px로 통일(사용자 요청)** — `css/main.css` 전수 조사해 한글이 렌더링되는 selector 중 16px 미만인 곳을 모두 16px로 변경(hero 서브 문구, 버튼, About Me 소제목/인적사항/타임라인, Expertise 안내문·그룹타이틀·라벨·설명, Quote 이름, Signature Dishes 카테고리/카드명/호버힌트, 레시피 모달 설명·재료·조리순서·셰프노트·재료제목, 테스티모니얼 카드 본문·작성자, 푸터 링크·카피라이트 등). 영문 전용 요소(nav 메뉴, hero duo 라벨/태그, 레시피 category 영문명, contact-pill 이메일/전화번호 등)는 한글이 아니므로 제외하고 유지. `--fs-small`/`--fs-label` 공유 토큰 자체는 건드리지 않고 각 selector에 직접 `16px`를 지정해 영문 전용 요소에 영향 없도록 처리. 반응형(1440/390) 확인 결과 줄바꿈·오버플로우 없음.
- **About Me 연도/기간 텍스트 자간 보정(사용자 첨부 스크린샷 `이력서연도.PNG` 기준)** — 학력/자격/경력 리스트에서 숫자(연도)가 옆의 한글 라벨보다 시각적으로 가늘고 좁아 보여 비율이 안 맞는다는 피드백. `.timeline-list .period`에 `letter-spacing: .03em`, `font-variant-numeric: tabular-nums` 추가해 숫자 자간을 살짝 넓히고 자릿수 폭을 고르게 정렬 — 데스크톱/모바일 모두 확인, 짧은 날짜("2024.12")와 긴 기간("1998.03–2001.02") 모두 자연스럽게 개선됨.

## 이번 세션 추가 수정 (2026-09-01, 3차)
- **About Me 자격사항 연도 채움(사용자 요청)** — `index.html` 자격 리스트 중 연도가 비어있던 4개 항목 채움: 블랑제리 마스터 1급 `2024.10`, 아동베이커리 마스터 1급 `2024.10`, 바리스타 2급 `2024.11`, 자동차운전면허 2종보통 `2017.04`.
- **고객이야기(테스티모니얼) 3장 전부 내용 교체(사용자 요청)** — 기존엔 "동료 셰프"/"매장 관리자"가 업무 동료 관점으로 남긴 후기였는데, "음식 먹고 댓글 남기는 고객" 컨셉으로 전면 교체. 3장 모두 임의의 이름 + 이름표(예: "박서연 · 방문 고객", "이도윤 · 재방문 고객", "김하늘 · 단골 고객")를 붙이고, 실제 방문 후기 톤의 문장으로 새로 작성. `index.html`의 `.testi-swiper` 슬라이드 3개(`<p>`, `.testi-card__who`) 수정.
- **테스티모니얼 카드 높이 불일치 버그 발견 및 수정** — 3개 카드 중 텍스트가 긴 카드만 높이가 커서(예: 237px vs 263px) 나란히 놓였을 때 비율이 안 맞는 문제 확인. CSS `align-items: stretch`(`css/main.css` `.testi-swiper .swiper-wrapper`)만으로는 Swiper 내부 `.swiper-slide { height: auto }` 규칙 때문에 실제로 늘어나지 않는 것을 Playwright로 직접 계측해 확인 → `js/main.js`에 `equalizeTestiCardHeights()` 함수 추가(Swiper `init`/`breakpoint` 이벤트 + `resize` 시 재계산)해서 3개 카드 높이를 JS로 강제 동일화. 데스크톱(1440)/태블릿(820)/모바일(390) 전부 완전히 동일한 높이로 렌더링됨을 확인.
- **이도윤 리뷰 줄 수 정리(사용자 요청)** — 세 카드 중 이도윤 리뷰만 5줄이라 이름 위치가 다른 두 카드보다 아래로 밀리는 문제. 문장을 다듬어 4줄로 줄여 세 카드 모두 텍스트 4줄 + 이름 라벨 위치가 동일해짐(Playwright 계측 확인: 3장 다 4줄).

## 이번 세션 추가 수정 (2026-09-01, 4차)
- **히어로 "더 알아보기" 버튼 → "이력서 보기"로 변경 + PDF 연결(사용자 요청)** — `index.html` 헤더의 `#about` 앵커 이동 버튼을 이력서 PDF 링크로 교체. 사용자가 제공한 `심진우이력서.pdf`를 `assets/docs/심진우이력서.pdf`로 이동시키고, 버튼에 `target="_blank" rel="noopener"`로 연결해 클릭 시 새 탭에서 PDF가 열리도록 처리(브라우저 내장 PDF 뷰어 사용, 별도 모달 구현 안 함). Playwright로 새 탭 오픈 및 응답(status 200, content-type: application/pdf) 확인 완료.

## 이번 세션 추가 수정 (2026-09-01, 5차)
- **이력서 PDF 교체(사용자 요청)** — `D:\포트폴리오다운로드\심진우이력서.pdf`(신규 파일)로 `assets/docs/심진우이력서.pdf`를 덮어씀. 링크는 기존 그대로(`index.html`의 "이력서 보기" 버튼) 유지, 파일 내용만 교체.
- **인적사항에 생년월일·거주지 추가(사용자 요청)** — `index.html` About Me의 `인적사항` `<dl class="kv">`에 `생년월일: 1982.11.13`, `거주지: 서울시 성북구 정릉로` 두 항목 추가(성명 다음, 연락처 이전 순서).
- **히어로 메인 문구 강조를 굵기 대비로 변경(사용자 첨부 스크린샷 `캡처.PNG` 기준)** — 기존엔 `<em>`으로 감싼 두번째 줄 전체(요리를 바라보는 넓은 시선)에 별도 시각 강조가 없이 제목 전체가 균일한 weight 600이었음. 첨부 이미지 분석 결과 "도마 앞의 성실함"과 "넓은 시선" 두 구간만 볼드, 나머지(에서, / 요리를 바라보는 / 으로)는 가는 글씨인 패턴 확인. `index.html`의 `<em>` 태그를 제거하고 해당 두 구간만 `<strong>`으로 감쌈. `css/main.css`에서 `.hero__title` 기본 `font-weight`를 600→400으로 낮추고 `.hero__title strong { font-weight: 800; }` 규칙으로 교체해 대비를 확실히 줌. 데스크톱/모바일 스크린샷으로 첨부 이미지와 패턴 일치 확인.

## 참고파일 원본 (사용자 제공, 삭제하지 말 것)
- `D:\포트폴리오다운로드\recipe-portfolio-demo.html` — 레시피 인터랙션 초기 참고
- `D:\포트폴리오다운로드\portfolio_site.html` — 실제 콘텐츠·기능 최종 참고 (RECIPES 데이터와 이미지 출처)
- `D:\포트폴리오다운로드\최종.png` — **피그마 최종 목업 풀페이지 스크린샷(10722×23224px, 매우 큼)**. Figma Dev Mode 접근이 없을 때 색상·레이아웃 실측 대체 자료로 매우 유용함이 이번 세션에서 확인됨. PIL로 열 때 `PIL.Image.MAX_IMAGE_PIXELS = None` 필요(기본 데콤프레션 폭탄 제한에 걸림).
- `D:\포트폴리오다운로드\심진우.jpg`, `심진우1.jpg` — 사용자 실제 사진(참고용, 현재 사이트엔 미사용 — 현재는 최종.png에서 크롭한 셰프복/슈트 사진 사용 중).
