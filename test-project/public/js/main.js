const chineseContent = {
  heroTitle: "张浩道",
  heroSubtitle: "一场穿越诗歌与文明的旅程",
  heroQuote: "“昔我往矣，杨柳依依。今我来思，雨雪霏霏。” —《诗经》",
  aboutMeTitle: "关于我",
  aboutMeText: "我是一位敬业且富有创新精神的英语教育工作者，拥有深厚的历史、语言学和技术背景。凭借 12 年以上的教育、课程开发和教学设计经验，我专注于利用技术提升语言习得和学生参与度。我擅长跨文化交流，能够为不同背景的学习者调整课程，并整合数字工具，打造互动式课堂体验。在中国生活三个月的经历，使我获得了沉浸式文化体验和语言学习的第一手经验。",
  changAnTitle: "古都长安：帝王与士人的回响",
  changAnText: "当我抵达西安，长安古都的辉煌似乎仍未消散...",
  huangshanTitle: "巍巍黄山：山水之间的仙境",
  huangshanText: "黄山的云雾，如梦如幻，仿佛每一座山峰都是一幅水墨画...",
  chengduTitle: "人间成都：闲适的烟火气息",
  chengduText: "在成都，生活的节奏缓慢如流水...",
  shanghaiTitle: "海上上海：现代与古典的交融",
  shanghaiText: "当我站在上海的外滩，东方明珠的灯光倒映在黄浦江上...",
};

const englishContent = {
  heroTitle: "Zhang Haodao",
  heroSubtitle: "A Journey Through Poetry and Civilization",
  heroQuote: "“When I left, the willows swayed gently, Now I return, snow falls thickly.” — Book of Songs",
  aboutMeTitle: "About Me",
  aboutMeText: "I am a dedicated and innovative English educator with a strong background in history, linguistics, and technology. With over 12 years of experience in education, curriculum development, and instructional design, I specialize in using technology to enhance language acquisition and student engagement. I am adept at cross-cultural communication, adapting lessons for diverse learners, and integrating digital tools for an interactive classroom experience. Having lived in China for three months, I gained firsthand experience in cultural immersion and language learning.",
  changAnTitle: "Chang'an: Echoes of Emperors and Scholars",
  changAnText: "When I arrived in Xi’an, the splendor of the ancient capital of Chang’an still lingered in the air...",
  huangshanTitle: "Huangshan: A Celestial Wonderland",
  huangshanText: "The mist of Huangshan was like a dream, each peak resembling an ink painting...",
  chengduTitle: "Chengdu: A City of Tranquility and Life",
  chengduText: "In Chengdu, life flows as slowly as a winding river...",
  shanghaiTitle: "Shanghai: Where Modernity Meets Tradition",
  shanghaiText: "As I stood on the Bund, the lights of the Oriental Pearl Tower shimmering over the Huangpu River...",
};

function setLanguage(lang) {
  const content = lang === "chinese" ? chineseContent : englishContent;
  document.querySelector(".calligraphy").textContent = content.heroTitle;
  document.querySelector(".hero h2").textContent = content.heroSubtitle;
  document.querySelector(".quote").textContent = content.heroQuote;
  document.querySelector(".about-me h2").textContent = content.aboutMeTitle;
  document.querySelector(".about-me p").textContent = content.aboutMeText;
  document.querySelector("#chang-an h2").textContent = content.changAnTitle;
  document.querySelector("#chang-an p").textContent = content.changAnText;
  document.querySelector("#huangshan h2").textContent = content.huangshanTitle;
  document.querySelector("#huangshan p").textContent = content.huangshanText;
  document.querySelector("#chengdu h2").textContent = content.chengduTitle;
  document.querySelector("#chengdu p").textContent = content.chengduText;
  document.querySelector("#shanghai h2").textContent = content.shanghaiTitle;
  document.querySelector("#shanghai p").textContent = content.shanghaiText;
}

document.getElementById("toggle-chinese").addEventListener("click", () => setLanguage("chinese"));
document.getElementById("toggle-english").addEventListener("click", () => setLanguage("english"));