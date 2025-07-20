# Personal Portfolio Web using Next.JS

=====================================

### Project Overview

This is a personal portfolio web application built using Next.js, a popular React-based framework for building server
rendered and statically generated applications. The application is designed to showcase a developer's skills, experience,
and projects in a visually appealing and user-friendly manner.

### Features

- **Home Page**: A brief introduction, and a call
  to action (CTA) button to encourage visitors to explore the portfolio.
- **About Page**: A page that provides a detailed overview of the developer's background,
  experience, and skills.
- **Projects Page**: A page that showcases the developer's projects, including images, descriptions,
  and links to live demos or GitHub repositories.
- **Contact Page**: A page that provides a contact form and a map to facilitate communication
  with the developer.
- **Blog Page**: Writing on topics to share to users.

> Packages used in this project

 <table>
    <tr>
      <th>Package Name</th>
      <th>Use In App</th>
    </tr>
    <tr>
      <td>framer-motion</td>
      <td>Component and container animation effects</td>
    </tr>
    <tr>
      <td>tailwindcss</td>
      <td>CSS styling library</td>
    </tr>
    <tr>
      <td>sharp</td>
      <td>Next image optimization</td>
    </tr>
  </table>

> Docker commands and usage

 <table>
    <tr>
      <th>Task</th>
      <th>Docker commands <a href="https://medium.com/@srijaanaparthy/step-by-step-guide-to-install-docker-on-amazon-linux-machine-in-aws-a690bf44b5fe">set up docker on ec2 instance</a></th>
    </tr>
    <tr>
      <td>Build a docker image using docker compose</td>
      <td>docker-compose build</td>
    </tr>
    <tr>
      <td>Run the image locally</td>
      <td>docker run -d -p 8080:3000 --name portfolio portfolio:v1.0.0</td>
    </tr>
    <tr>
      <td>Push Docker image to Dockerhub</td>
      <td>docker tag portfolio:v1.0.0 adewaleda/portfolio:v1.0.0</td>
    </tr>
    <tr>
      <td>Push local image to repository</td>
      <td>docker push adewaleda/portfolio:v1.0.0</td>
    </tr>
    <tr>
      <td>Pull image from DockerHub</td>
      <td>docker pull adewaleda/portfolio:v1.0.0</td>
    </tr>
    </table>

    #### Visit Site

[VISIT PROFILE](https://adewaleda.com/)

##### Projects Developed

[FarmSmarter Website](https://farmsmarter.app/)
[FarmSmarter WebApp](https://beta-webapp.farmsmarter.app/)
[Mindwalks Website](https://www.mindwalks.org/)
[7thCare Website](https://www.7thcare.com/)
[7thCare Hospitals](https://7thcarehospitals.vercel.app/)
[99Apartment](https://www.the99apartments.com/)
[FiatExpress](https://www.fiatexpress.com/)
[MentorIntroAfrica](https://www.mentorintroafrica.com/)
[Premium Souvenir Web App](https://premium-souvenirs.vercel.app/)
[Tutorial Hub](https://tutorial-hub-umber.vercel.app/)
[Fingerprint Attendance Manager](https://project-frontend-indol-theta.vercel.app/)
[FarmSmarter Marketplace](#)
[Jamb IBASS service](#)
[CARTWAY](https://www.cartwayhq.com/)
[JUPEB Attendance Management System](https://attendance.jupeb.edu.ng/)
[99Apt Customer Success + Operations Super Admin WebApp](https://staging-backoffice.the99apartments.com/)
[iSportX](https://isportx.vercel.app/)

##### Companies I have worked with

- Jamb
- Jupeb
- Cartway
- FarmSmarter
- PCI Investments Ltd
- 99Apartments
- 99Keys
- SocialLiga
- FiatExpress
- MentorIntroAfrica
- Mindwalks
- Premium Souvenirs
- 7thCare
- Tutorial Hub

npm i axios resend crypto @supabase/ssr @supabase/supabase-js date-fns @react-email/components crypto-random-string
