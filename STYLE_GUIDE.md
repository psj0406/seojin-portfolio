# Style Guide

이 문서는 `seojin-Portfolio` 프로젝트의 코드 작성 기준을 정리합니다.  
목표는 Next.js 구조를 따르면서도, 유지보수하기 쉬운 퍼블리싱 스타일을 유지하는 것입니다.

---

## Project Structure

```text
src/
├── app/
│   ├── globals.scss
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
├── data/
├── lib/
└── styles/
    ├── variables.scss
    ├── mixins.scss
    ├── media.scss
    ├── use.scss
    └── common.scss
```

---

## SCSS Structure

### app/globals.scss

`globals.scss`는 전역 스타일 진입점입니다.  
`layout.tsx`에서 한 번만 import합니다.

```tsx
import "./globals.scss";
```

`globals.scss`에는 다음 내용만 작성합니다.

- `@charset`
- `@use`
- `:root`
- `html`
- `body`
- 기본 전역 스타일

```scss
@charset "utf-8";

@use "@/styles/use" as *;
@use "@/styles/common";

:root {
  --bg: #f7f7f5;
  --text: #111111;
  --muted: #777777;
  --line: rgba(17, 17, 17, 0.14);
  --dark: #0f0f0f;
  --dark-text: #f4f4f1;
  --dark-muted: rgba(244, 244, 241, 0.55);
  --accent: #315efb;
  --accent2: #285f04;
  --ease: cubic-bezier(.22, 1, .36, 1);
}

html {
  font-size: 10px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  word-break: keep-all;
  @include font-base;
}
```

---

### styles/variables.scss

공통 Sass 변수를 관리합니다.

```scss
$width1: 1280;

$ff-default: "Pretendard", sans-serif;
$ff-eng: "Oswald", sans-serif;
$ff-point: "NanumMyeongjo", serif;

$fs-base: 10;
$fs-body: 16;
$lh-base: 25;

$text: #111111;
$muted: #777777;
$accent: #315efb;

$time: all 0s;
$transition-default: all 0.3s ease-in-out;
```

Sass 변수의 색상 값은 `app/globals.scss`의 CSS Variable(`--text`, `--muted`, `--accent`)과 항상 동일한 값으로 맞춥니다.
실제 화면 스타일에는 CSS Variable(`var(--accent)` 등)을 사용하고, Sass 변수는 계산이 필요한 경우에만 사용합니다.

---

### styles/mixins.scss

함수와 mixin을 관리합니다.

```scss
@use "sass:math";
@use "./variables" as *;

@function rem($px) {
  @return #{math.div($px, $fs-base)}rem;
}

@mixin fs($size) {
  font-size: rem($size);
}

@mixin font-base {
  @include fs($fs-body);
  line-height: math.div($lh-base, $fs-body);
  font-family: $ff-default;
  font-weight: 400;
}
```

`font-base`에는 색상을 포함하지 않습니다.  
색상은 `body` 또는 각 스타일에서 별도로 지정합니다.

---

### styles/media.scss

반응형 mixin을 관리합니다.

```scss
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: 1024px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: 1025px) {
    @content;
  }
}
```

---

### styles/use.scss

module.scss에서 사용할 Sass 파일을 한 번에 묶어주는 진입점입니다.

```scss
@forward "./variables";
@forward "./mixins";
@forward "./media";
```

각 module.scss에서는 아래 한 줄만 사용합니다.

```scss
@use "@/styles/use" as *;
```

---

### styles/common.scss

기존 공통 UI 스타일을 관리합니다.

예시:

- 아코디언
- 탭
- 레이어팝업
- 공통 UI 컴포넌트 스타일

`common.scss`는 기존 코드 기준으로 유지하며, 불필요하게 수정하지 않습니다.

---

## CSS Variable & Sass Variable

CSS Variable과 Sass Variable은 함께 사용합니다.

### Sass Variable

SCSS 내부 계산, mixin, function에서 사용합니다.

```scss
$color-primary: #0033a0;
$fs-base: 10;
```

### CSS Variable

브라우저에서 직접 사용하는 디자인 토큰입니다.

```scss
:root {
  --accent: #0033a0;
  --text: #231f20;
}
```

사용 예시:

```scss
.button {
  color: var(--accent);
}
```

---

## SCSS Modules

각 컴포넌트는 `Component.module.scss`를 사용합니다.

```text
components/
└── Hero/
    ├── Hero.tsx
    └── Hero.module.scss
```

module.scss 상단에는 항상 아래 코드를 작성합니다.

```scss
@use "@/styles/use" as *;
```

---

## Class Naming

짧고 직관적인 클래스명을 사용합니다.

### Preferred

```text
visual
inner
cont
tit
txt
list
item
thumb
info
desc
btn_wrap
img_box
txt_area
```

### Avoid

```text
visual_inner
visual_cont
heroTitle
projectCard
card__item
card--active
```

---

## SCSS Nesting

HTML 구조가 한눈에 보이도록 중첩해서 작성합니다.

```scss
.visual {
  .inner {
    .cont {
      .tit {}

      .txt {}
    }

    .list {
      .item {
        .thumb {}

        .info {}
      }
    }
  }
}
```

`visual_inner`, `visual_tit`처럼 부모명을 이어붙이는 방식은 사용하지 않습니다.

---

## React / Next.js

- App Router 기준으로 작성합니다.
- 컴포넌트는 `export default function`을 사용합니다.
- props가 필요한 경우 `interface`를 위에 선언합니다.
- 불필요한 추상화는 지양합니다.
- `useMemo`, `useCallback`, custom hook은 필요한 경우에만 사용합니다.
- HTML 구조가 먼저 보이도록 작성합니다.

```tsx
interface HeroProps {
  title: string;
}

export default function Hero({ title }: HeroProps) {
  return (
    <section className={styles.visual}>
      <div className="inner">
        <div className={styles.cont}>
          <h2 className={styles.tit}>{title}</h2>
        </div>
      </div>
    </section>
  );
}
```

---

## GSAP

GSAP 적용이 쉽도록 구조를 단순하게 유지합니다.

ref 이름은 의미 있게 작성합니다.

```tsx
const sectionRef = useRef<HTMLElement>(null);
const titleRef = useRef<HTMLHeadingElement>(null);
const listRef = useRef<HTMLUListElement>(null);
```

권장 ref 이름:

```text
sectionRef
titleRef
textRef
listRef
itemRef
```

---

## Work Rule

- 한 번에 너무 많은 파일을 수정하지 않습니다.
- 구조 변경은 작은 단위로 진행합니다.
- 공통 SCSS는 신중하게 수정합니다.
- 기존 `common.scss`는 필요한 경우에만 수정합니다.
- 새로운 규칙이 생기면 이 문서에 추가합니다.