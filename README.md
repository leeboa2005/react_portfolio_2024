# 🌐 포트폴리오
> 다양한 프로젝트와 기술 경험을 담은 개인 포트폴리오입니다.
메인 페이지에서 프로젝트와 About 섹션으로 이동할 수 있으며,  
프로젝트 섹션에서는 실제 작업했던 팀/개인 프로젝트와 업무 경험을 확인할 수 있습니다.  
About 섹션에서는 개인 사진과 기술 스택을 소개합니다.

## 📌 목차
- [⚡ 핵심 기능](#핵심-기능)
- [🛠 기술 스택](#기술-스택)
- [🎨 화면 구성](#화면-구성)
- [🔄 사용자 플로우](#사용자-플로우)


## <h3 id="핵심-기능">⚡ 핵심 기능</h3>

- **메인 페이지**: GSAP 스크롤 애니메이션, 이미지 말풍선 호버 효과, Overview에서 Project/About 이동  
- **프로젝트 페이지**: 개인·팀·작업물 구분, 기술별 필터링, 호버 시 영상 미리보기  
- **Supabase 연동**: 프로젝트 유형별 세부 정보 저장, 클릭 시 동적 서브페이지 출력  
- **About 페이지**: 개인 사진 및 기술 소개, 사진 호버 시 추억 표현 효과, 기술 정보 스크롤 시 진행률 애니메이션  
- **기타**: GitHub 버튼, Footer, 네비게이션 등 다양한 상호작용 효과

## <h3 id="기술-스택">🛠 기술 스택</h3>

### Frontend
<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=gsap&logoColor=white" />
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />

</p>

### Backend / DB
<p>
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

### Tools
<p>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>


## <h3 id="화면-구성">🎨 화면 구성</h3>

![Personal 04 GIF](https://github.com/leeboa2005/react_portfolio_2024/blob/main/public/project/personal_04.gif)


## <h3 id="사용자-플로우">🔄 사용자 플로우</h3>

```mermaid
flowchart TD
    A[사용자 접속]
    A --> B[홈 페이지 탐색]

    B --> C[프로젝트 선택]
    C --> D[개인·팀·작업물 구분 및 기술별 필터링]
    D --> E[썸네일 확인 및 호버 시 영상 미리보기]
    E --> F[선택한 프로젝트 상세 정보 확인]

    B --> G[About 선택]
    G --> H[개인 사진 및 기술 정보 확인]
    H --> H1[사진 호버 시 추억 표현 효과]
    H --> H2[기술 정보 스크롤 시 채워지는 진행률 효과]

    A --> I[GitHub 버튼, Footer, 네비게이션 등 상호작용]
