# 봉골레 파스타 — AI 요리 숏폼 대본 (구글 플로우 / Veo 3.1)

**주인공 설정**: 20년차 한국인 양식 셰프, 40대 초반, 흰색 셰프 자켓 + 검은 에이프런, 손목까지 걷어올린 소매, 능숙하고 절제된 손동작 (나이 표현은 보조 텍스트일 뿐 — 실제 외모는 첨부한 참조 이미지가 우선이므로 이미지보다 늙게 나오지 않도록 문구에서도 나이를 낮춰 잡음)
**포맷**: 9:16 세로, 씬당 8초, 총 9씬 (72초)
**첨부 이미지**: 주인공 얼굴 참조 사진 1장을 매 프롬프트에 동일하게 첨부 → 캐릭터 일관성 유지

---

## 배경 레퍼런스 이미지 생성 프롬프트 (Nano Banana)

먼저 아래 프롬프트로 주방 배경 이미지를 1장 생성해서, 이후 모든 씬에 캐릭터 사진과 함께 첨부한다.

```
A bright all-white modern kitchen interior, empty of people, photographed at counter height from the open room looking toward a large white marble island with subtle gray veining. The island has a built-in induction cooktop facing outward toward the camera/room — not against the wall. A large pot of boiling water sits on the left side of the cooktop, empty space on the right for a saute pan. A wooden cutting board and a stack of clean white plates rest on the island to the right, for chopping and plating. White shaker-style cabinets and a white subway-tile wall in the background behind the island. A small potted basil plant at the far right edge of the island, soft natural daylight from windows on either side, clean and airy atmosphere, no clutter. Cinematic food photography style, shallow depth of field, 4K, vertical 9:16.
```

---

## 공통 캐릭터 고정 문구 (모든 프롬프트 맨 앞에 붙여넣기)

```
Reference the attached photo for the chef's face and identity — maintain exact same face, hairstyle, and body build across all scenes. A Korean male chef in his early 40s, youthful and energetic in appearance despite 20 years of experience in Italian cuisine, wearing a white chef jacket with rolled-up sleeves and a black apron. Calm, confident, precise movements — the muscle memory of two decades.

Setting (fixed identically across all 9 scenes): a bright all-white modern kitchen with a large white marble island (subtle gray veining) built with an induction cooktop facing outward into the open room — the chef stands on the far side of the island facing the camera and the open room, never with his back to the camera. A large pot of boiling water sits on the left side of the cooktop, empty space on the right for the saute pan. White shaker-style cabinets and a white subway-tile wall stand behind the chef in the background. A wooden cutting board and a stack of clean white plates rest on the island counter to his right for chopping and plating. A small potted basil plant at the far right edge of the island, soft natural daylight from windows to either side, airy and clean atmosphere. Same camera height and same kitchen layout in every scene — only the framing (close-up, overhead, wide, or side profile) changes, never the room itself. Shallow depth of field, cinematic food photography style, 4K, vertical 9:16.
```

---

## 씬 1. 메뉴 소개 (8초)

**한글 요약**: 셰프가 카메라를 정면으로 응시하며 오늘의 메뉴를 소개
**속도감**: 느리고 안정적 — 신뢰감 있는 도입부

```
[공통 캐릭터 문구]
The chef stands behind the counter, looking directly at the camera with a calm, confident expression. He gives a slight nod, silent, no dialogue, mouth closed — no spoken words. On the counter in front of him, a beautifully plated bowl of linguine vongole is already visible, softly lit — the clams are small oval Manila clams (모시조개) with pale tan-beige mottled shells, clearly not mussels (no dark blue-black shells). Slow push-in camera movement toward his face. Steam rises subtly from the dish beside him. Ambient kitchen sounds, soft.
```

---

## 씬 2. 재료 소개 (8초)

**한글 요약**: 링귀니, 쥬키니 호박, 깐마늘, 페퍼론치노, 모시조개, 바질, 엑스트라 올리브오일이 순서대로 도마 위에 놓임 (조개육수는 모시조개를 삶은 뒤에야 나오는 재료라 재료 소개 씬에서는 제외)
**속도감**: 리드미컬한 빠른 컷 — 재료가 하나씩 탁탁 놓이는 느낌

```
[공통 캐릭터 문구]
Overhead top-down shot of a wooden counter. The chef's expression stays calm and neutral, no exaggerated gestures, no thumbs up, mouth closed, no dialogue. Plain white chef jacket with no name embroidery, no text, no logos. Quick rhythmic cuts, each lasting under 1 second, showing all seven ingredients in order — each ingredient appears exactly once, never duplicated or shown twice in different spots: raw linguine pasta placed down, a whole zucchini placed down, a single small bowl of peeled garlic cloves (깐마늘, not a whole bulb — only one bowl of garlic in the entire frame) placed down, a single cluster of dried peperoncino chili peppers placed down (only one pile of chilies in the entire frame, not two), a bowl of live Manila clams (모시조개, small oval shells with pale tan-beige mottled patterns, not mussels) placed down, fresh basil leaves placed down, a bottle of extra virgin olive oil placed down standing upright on its base with the cap facing straight up — never lying on its side. Each ingredient lands with a soft tap sound. Fast-paced, punchy editing rhythm, natural daylight from above.
```

---

## 씬 3. 파스타 삶기 (8초)

**한글 요약**: 냄비에 물, 소금, 올리브오일 → 끓으면 링귀니 투입(4분 30초는 타임랩스로 압축) → 집게로 파스타를 건져 팬 쪽으로 이동 (콜란더에 붓지 않고 집게로 직접 건지는 방식 — 시간도 절약되고 실제 조리 기법과도 일치)
**속도감**: 물이 끓어오르는 역동성 + 타임랩스 전환 + 마지막 집게질의 손목 스냅

```
[공통 캐릭터 문구]
Close-up of a large pot of boiling water with salt and a drizzle of olive oil swirling on the surface, bubbles rising vigorously. The chef's hand drops linguine pasta into the pot in a fanning motion, steam bursting upward. Quick time-lapse effect showing the pasta softening and swirling in the rolling boil, compressing the several minutes of cooking into a rapid blur. Time-lapse resolves back to real-time: the chef grabs the pasta with tongs, lifting a twirled bundle of al dente linguine straight out of the pot, water dripping off in strands, then turns his wrist to angle the tongs toward the pan off-frame, ready to transfer — no colander, no pouring out into a strainer, just a direct tongs lift. Handheld camera with slight motion, high energy, steam and bubble sound effects emphasized, a sharper close-up on the dripping pasta as it lifts out.
```

---

## 씬 4. 모시조개 삶기 + 육수 거르기 (8초)

**한글 요약**: 해감된 모시조개를 삶고, 육수를 체에 걸러냄
**속도감**: 조개 입이 열리는 순간을 강조, 리드미컬한 붓는 동작

```
[공통 캐릭터 문구]
Close-up shot: a pot of fresh Manila clams (모시조개, small oval shells with pale tan-beige mottled patterns, clearly not mussels) opening one by one as they steam, quick cuts between shells popping open. The chef then pours the pot's contents through a fine mesh strainer over a bowl, clear golden clam broth streaming down in a smooth, confident pour. Steam swirling, satisfying pouring sound, slight slow motion on the pour itself for emphasis, otherwise fast cuts.
```

---

## 씬 5. 마늘 편썰기 + 쥬키니 슬라이스 (8초)

**한글 요약**: 깐마늘을 0.3mm 두께로 편 썰고, 쥬키니 호박을 반으로 갈라 0.4mm로 슬라이스
**속도감**: 칼질 리듬감 강조 — 빠르고 정확한 타닥타닥 소리

```
[공통 캐릭터 문구]
Extreme close-up of the chef's hands on a wooden cutting board. Rapid, precise knife work: paper-thin garlic slices falling in a cascading rhythm, blade moving fast with 20 years of muscle memory. Quick cut to zucchini being sliced lengthwise in half, then into thin uniform half-moon slices, knife moving in a fast steady staccato rhythm. Sharp rhythmic chopping sounds synced to the blade, motion blur on the knife strikes.
```

---

## 씬 6. 마늘 볶기 (골드브라운) (8초)

**한글 요약**: 팬에 올리브오일 2큰술을 두르고 마늘을 골드브라운 색이 나도록 볶음
**속도감**: 지글거리는 사운드와 팬을 흔드는 손목 스냅

```
[공통 캐릭터 문구]
Close-up on a heated stainless steel pan, olive oil poured in and shimmering. The chef adds sliced garlic, tossing the pan with a quick confident flick of the wrist, garlic sizzling and turning gradually from pale to golden brown. Steam and light smoke rising, oil sizzling sound prominent, warm golden lighting reflecting off the pan, fast handheld camera following the pan's motion.
```

---

## 씬 7. 쥬키니+페퍼론치노+조개 볶음 → 화이트와인 플람베 (8초)

**한글 요약**: 쥬키니와 페퍼론치노(3~4알)를 볶다가 모시조개 투입, 화이트 와인으로 플람베
**속도감**: 플람베 불길이 터지는 순간을 임팩트 있게 — 액션의 클라이맥스

```
[공통 caption 문구 참고]
[공통 캐릭터 문구]
The chef adds sliced zucchini and dried peperoncino chilies into the sizzling pan, tossing quickly. He adds the clams (small oval Manila clams with pale tan-beige mottled shells, not mussels), tossing once more, then pours white wine into the pan in one confident motion — a dramatic flame flambé bursts up instantly, bright orange fire licking upward for a split second before the chef gives the pan a sharp shake to control it. Fast dramatic camera shake on the flame burst, sizzling and whooshing fire sound, high energy climax moment.
```

---

## 씬 8. 육수+면수 → 파스타 투입 → 에멀전 (8초)

**한글 요약**: 조개육수와 면수를 넣고 끓이다 링귀니 투입, 육수가 2~3큰술 남았을 때 엑스트라버진 올리브오일과 바질을 넣어 에멀전
**속도감**: 팬을 빠르게 스윙하며 유화시키는 손목 동작 강조

```
[공통 캐릭터 문구]
The chef pours clam broth and pasta water into the pan, bringing it to a bubbling simmer, then adds the cooked linguine, tossing it vigorously to coat. As the sauce reduces, he drizzles extra virgin olive oil in a thin stream while rapidly swirling the pan in tight circular motions, the sauce turning glossy and emulsified, clinging to the noodles. He scatters torn basil leaves on top with a flick. Fast rhythmic pan-swirling motion, glossy sauce close-up, sizzling and swirling sound, steam rising.
```

---

## 씬 9. 플레이팅 (8초)

**한글 요약**: 완성된 파스타를 접시에 보기 좋게 담아 마무리
**속도감**: 앞선 씬들과 대비되는 느린 슬로우모션 — 완성의 여유

```
[공통 캐릭터 문구]
Slow motion shot: the chef twirls the glossy linguine vongole around a fork and lifts it into a clean white plate with elegant, deliberate movements, arranging the clam shells (small oval Manila clams with pale tan-beige mottled shells, not mussels) artfully around the pasta, drizzling a final touch of olive oil and a basil leaf on top. He steps back slightly and gives a small satisfied nod, looking at the camera, silent, no dialogue, mouth closed — no spoken words. Soft cinematic lighting, gentle steam rising from the plate, calm ambient sound, slow deliberate pacing as a visual exhale after the fast-paced cooking sequence.
```

---

## 편집 팁

- **속도 리듬 설계**: 씬1(느림) → 씬2(빠름/리드미컬) → 씬3~6(중~빠름) → 씬7(클라이맥스, 가장 임팩트) → 씬8(빠름) → 씬9(느림, 마무리 여운). 빠름-빠름-빠름만 반복하면 지루해지니 씬1과 씬9를 느리게 배치해 완급을 준 구조.
- **배경 고정**: 캐릭터 얼굴만큼 배경도 구체적으로 못 박아야 함. "모던 주방" 정도로 뭉뚱그리면 씬마다 타일, 조명 방향, 소품 위치가 달라져서 "다른 주방"처럼 보임. 위 공통 문구의 배경 세부 요소(스톤 카운터, 타일, 구리 냄비, 바질 화분, 조명 방향)를 절대 빼먹지 말 것.
- **가능하면 주방 사진도 1장 확보**: 캐릭터 얼굴 사진처럼, 실제 사용할 주방 사진(직접 촬영하거나 레퍼런스로 고른 이미지) 1장을 매 프롬프트에 함께 첨부하면 텍스트 묘사보다 훨씬 안정적으로 배경이 고정됨. 텍스트 묘사는 이미지가 없을 때의 차선책.
- **편집 팁**: 씬 전환은 컷 편집(하드컷) 위주로, 씬7 플람베 직전에만 0.1초 정지 프레임을 넣으면 임팩트가 배가됨.
- **일관성 체크**: Veo 생성 후 셰프 얼굴이 씬마다 미묘하게 달라질 수 있으니, 참조 이미지 첨부 + 캐릭터 고정 문구는 절대 생략하지 말 것. 그래도 흔들리면 동일 시드값을 고정하는 방법도 있음.
