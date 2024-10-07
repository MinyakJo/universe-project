# Common Directory

- Component의 단위는 안며, Styled-Component를 최적화하여 사용하기 위한 공간

- 기본 Tag들이 나열되어 있으며, Default Style이 지정되어 있음

- 추가적인 Style 조절은 props를 통해 진행하며, Component 개발 단계에서 CSS를 신경쓰게하지 않기 위함

- Props가 너무 많아질 것을 대비하여, 가장 기본적인 내용 외에는 이름을 나누어 별도의 Common Component를 만들 것을 권장

예시) CursorDiv, ShadowDiv 등

- 좋은 아이디어로 추가 및 수정이 필요한 경우 Github Repo에 PR을 남길 것

# Guide

- Stageus의 React 개발 고유 Convension

- 작업하기 전, 두 개의 설정을 진행해야 함

### 1. Color 및 Size 지정

- /src/components/style.js

- 프로젝트에서 사용할 색상과 글씨 크기 지정

### 2. Font 지정

- /src/font/font.js

- 사용할 폰트 파일을 저장하고, 파일을 수정하여 이름과 함께 지정