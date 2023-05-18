<div align="center">
<img src="https://i.ibb.co/1ZwDJTp/banner.png" align="center" style="width: 100%" />
</div> 


![online](https://img.shields.io/website?down_color=red&down_message=offline&style=plastic&up_color=green&up_message=online&url=http%3A%2F%2Fbawix.xyz%3A81%2Fapp%2F)
![veľkosť](https://img.shields.io/github/repo-size/dominikvozr/DP-Frontend?color=gree&label=ve%C4%BEkos%C5%A5&style=plastic)
![počet súborov](https://img.shields.io/github/directory-file-count/dominikvozr/DP-Frontend?style=plastic)
![riadkov kódu](https://img.shields.io/tokei/lines/github/dominikvozr/DP-Frontend?style=plastic)
![posledný commit](https://img.shields.io/github/last-commit/dominikvozr/DP-Frontend?label=posledn%C3%BD%20commit&style=plastic)
---
# StudentCode Frontend
---
###### SK

Tento repozitár obsahuje zdrojový kód Diplomových prác **Skúškový systém - Virtualizované vývojové prostredie** a
**Skúškový systém - Automatizované vyhodnotenie študentských projektov**. Tento README súbor slúži ako technická príručka implementovaného kódu. Súčasnú verziu aplikácie si môžete pozrieť na [tomto linku](http://bawix.xyz:81/app/professor/)
---
### Štruktúra zdrojového kódu
* adapter/express
    * [vite config](adapters/express/vite.config.ts) - nastavenie vite pri stavaní aplikácie
* bin - cesty k npm a npx knižniciam
* fe-chart
    * [values](fe-chart/values.yaml) - premenné podu
* fe-chart/templates
    *  [deployment](fe-chart/templates/deployment.yaml) - definované nasadenie na kubernetes cluster
    *  [ingress](fe-chart/templates/ingress.yaml) - nastavenie reverznej proxy
    *  [service](fe-chart/templates/service.yaml) - nastavenie služby
    *  [service account](fe-chart/template/serviceaccount.yaml) - nastavenie autentifikácie
*  public - statické súbory
*  src - zdrojové súbory
*  src/components - komponenty na vykresľovanie
    *  [activity bar](src/components/activityBar/activityBar.tsx) - komponent, ktorý je zobrazený na každej stránke
    *  [exam modal](src/components/exam/modal.tsx) -modal testu
    *  [header](src/components/header/header.tsx) - hlavička HTML súboru
    *  [icons](src/components/icons/qwik.tsx)
    *  [logo](src/components/logo/logo.tsx) - studendCode logo
    *  [pagination](src/components/pagination/pagination.tsx) - stránkovanie
    *  [partytown](src/components/partytown/partytown.tsx) - partytown trieda na lazy-loading
    *  [project list](src/components/projectList/projectList.tsx) - (nepoužívané)
    *  [route head](src/components/router-head/router-head.tsx) - hlava smerovača a jeho metadáta
* src/components/professor - komponenty zobrazujúce sa profesorovi
    * [exam item](src/components/professor/ExamItem.tsx) - karta testu vytvoreného profesorom
    * [evaluation](src/components/professor/evaluation.tsx) - komponent zobrazujúci hodnotenie testu a evaluáciu    
 * src/components/student - komponenty zobrazujúce sa študentovi
    * [test item](src/components/student/TestItem.tsx) - komponent zobrazujúci link a meno repozitára
    * [evaluation](src/components/student/evaluation.tsx) - komponent zobrazujúci hodnotenie testu a evaluáciu
 * src/components/test - komponenty na zobrazovanie stavu testu
    * [test closed](src/components/test/testClosed.tsx) - uzavretý test
    * [test show](src/components/test/testShow.tsx) - (nepoužívané), komponent nájdete v [[slug]/test](src/routes/student/test/[slug]/index.tsx) 
    * [test invitation](src/components/test/testInvitation.tsx) - vstupiť do testu
* src/context - kontexty na zdieľanie dát medzi komponentami
    * [contexts](src/contexts/contexts.ts) 
* src/db - api objekty a volania na [backend](https://github.com/dominikvozr/DP-Backend)
    * [coder](src/db/CoderApi.tsx) - wrapper objekt CoderApi pre volania na coder-api [endpoint](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/coder-api)
    * [event](src/db/EventApi.tsx) - wrapper objekt EventApi pre volania na event [endpoint](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/event)
    * [exam](src/db/ExamApi.tsx) - wrapper objekt ExamApi pre volania na vytvaranie testu u [profesora](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/professor) a [študenta](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/student)
    * [pipeline](src/db/PipelineApi.tsx) - wrapper objekt PipelineApi pre volania na pipeline [endpoint](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/pipeline)
    * [report](src/db/ReportApi.tsx) - wrapper objekt ReportApi pre volania na report [endpoint](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/report)
    * [test](src/db/TestApi.tsx) - wrapper objekt TestApi pre volania na student [endpoint](https://github.com/dominikvozr/DP-Backend/tree/dev/server/api/student)
    * [user](src/db/UserApi.tsx) - wrapper objekt UserApi pre volania na user [endpoint](https://github.com/dominikvozr/DP-Backend/blob/dev/server/api/user.ts)
    * [url](src/db/url.tsx) - nastavenie pre vývojárov na spustenie na lokálnom zariadení
* src/helpers - pomocné funkcie
    * [data helper](src/helpers/dateHelper.ts) - pomocná funkcia na prácu s časom
    * [event class](src/helpers/eventClass.ts) - trieda tailwindClassMapping na zobrazovanie farieb v kartách
    * [event class mapping](src/helpers/eventClassMapping.ts) - trieda eventClassMapping na zobrazovanie stavu evaluácie a hodnotenia
* src/models - datové objekty
    * [exam](src/models/Exam.ts) - rozhranie ExamInteface a trieda Exam
    * [pipeline](src/models/Pipeline.ts) - rieda Pipeline
    * [test](src/models/Test.ts) - rozhranie TestInterface a trieda Test
    * [user](src/models/User.ts) - rozhranie UserInterface a trieda User
* src/routes - stránky aplikácie
    * [index](src/routes/index.tsx)
    * [layout](src/routes/layout.tsx) - hlavné rozloženie stránky 
    * [service worker](src/routes/service-worker.ts) - qwikom vytvorený worker na redukcie latencie
* src/routes/login - prihlasovanie do aplikácie
    *  [index](src/routes/login/index.tsx)
* src/routes/professor - stránky profesora
    * [index](src/routes/professor/index.tsx) - hlavná stránka profesora
* src/routes/professor/create
    * [index](src/routes/professor/exam/create/index.tsx) - stránka na vytvorenie testového zadania
* src/routes/professor/[id]
    * [index](src/routes/professor/exam/[id]/index.tsx) - stránka s detailami testu
* src/routes/professor/pipeline/create
    * [index](src/routes/professor/pipeline/create/index.tsx) - stránka na vytvorenie pipeliny na automatizované testovanie
* src/routes/professor/template/create - (nepoužívané)
* src/routes/professor/test/[slug]/evaluation
    * [index](src/routes/professor/test/[slug]/evaluation/index.tsx) - stránka na zobrazovanie evaluácie a hodnotenia
* src/routes/student - stránky študenta
    * [index](src/routes/student/index.tsx) - hlavná stránka študenta
* src/routes/student/test/[slug]
    * [index](src/routes/student/test/[slug]/index.tsx) - stránka testu
* src/routes/student/test/[slug]/evaluation
    * [index](src/routes/student/test/[slug]/evaluation/index.tsx) - zobrazenie evaluácie a hodnotenia

---
###### 2023
