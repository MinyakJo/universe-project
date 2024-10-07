# Stageus React Template

- 스테이지어스에서 사용하는 React 프로젝트 템플릿 Repo
- 해당 프로젝트를 Clone하여 작업을 시작할 것
- 해당 프로젝트에 업데이트가 필요하면, PR을 남길 것

# Commands

- 프로젝트 시작 : npm start
- 프로젝트 빌드 : npm run build

# Dependencies

- react 18.2
- react-dom 18.2
- react-router-dom 6.6
- react-responsive 9.0
- react-scripts 5.0
- styled-components 5.3
- recoil 0.7

# Convension Note

- index.html
: 기본적인 root div 뿐만 아니라, SEO 관련된 설정이 있으니 채워줘야 함
: favicon, OG 등의 데이터를 public 폴더에 삽입

- jsconfig.json
: js 설정 파일
: react의 경로를 절대 경로로 설정하는 옵션이 설정되어 있음

- Common Style
: /src/components/style.js
: 자주 사용하는 Style에 대한 String Key를 설정하는 파일
: font-size, color를 미리 설정하여 사용할 것

- Font
: /src/font
: 사용할 폰드 파일을 해당 폴더에 삽입
: font.js 수정을 통해 프로젝트에 바로 적용할 수 있음