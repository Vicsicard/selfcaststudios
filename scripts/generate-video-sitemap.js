const fs = require('fs');
const path = require('path');

const videos = [
  {
    title: 'Welcome to Self Cast Studios',
    description: 'Transform your personal brand with strategic storytelling.',
    thumbnail: 'https://imagestopost.carrd.co/assets/videos/video08.jpg',
    content: 'https://imagestopost.carrd.co/assets/videos/video08.mp4',
    player: 'https://selfcaststudios.com/',
    duration: 'PT2M30S',
    publication_date: '2025-04-02T14:00:00+00:00',
  },
  {
    title: 'Narrative Defense Introduction',
    description: 'Protect and preserve your professional reputation.',
    thumbnail: 'https://imagestopost.carrd.co/assets/videos/video01.jpg',
    content: 'https://imagestopost.carrd.co/assets/videos/video01.mp4',
    player: 'https://selfcaststudios.com/services/narrative-defense',
    duration: 'PT3M15S',
    publication_date: '2025-04-02T14:00:00+00:00',
  },
  {
    title: 'Client Success Story - Narrative Defense',
    description: 'See how our clients transformed their narrative.',
    thumbnail: 'https://imagestopost.carrd.co/assets/videos/video03.jpg',
    content: 'https://imagestopost.carrd.co/assets/videos/video03.mp4',
    player: 'https://selfcaststudios.com/testimonials',
    duration: 'PT2M45S',
    publication_date: '2025-04-02T14:00:00+00:00',
  },
  {
    title: 'Narrative Elevation Overview',
    description: 'Transform your personal brand into a powerful platform.',
    thumbnail: 'https://imagestopost.carrd.co/assets/videos/video04.jpg',
    content: 'https://imagestopost.carrd.co/assets/videos/video04.mp4',
    player: 'https://selfcaststudios.com/services/narrative-elevation',
    duration: 'PT2M15S',
    publication_date: '2025-04-02T14:00:00+00:00',
  },
  {
    title: 'Client Success Story - Narrative Elevation',
    description: 'Real results from our narrative elevation service.',
    thumbnail: 'https://imagestopost.carrd.co/assets/videos/video07.jpg',
    content: 'https://imagestopost.carrd.co/assets/videos/video07.mp4',
    player: 'https://selfcaststudios.com/services/narrative-elevation',
    duration: 'PT3M00S',
    publication_date: '2025-04-02T14:00:00+00:00',
  },
];

const generateVideoSitemap = () => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  videos.forEach(video => {
    xml += '  <url>\n';
    xml += `    <loc>${video.player}</loc>\n`;
    xml += '    <video:video>\n';
    xml += `      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>\n`;
    xml += `      <video:title>${video.title}</video:title>\n`;
    xml += `      <video:description>${video.description}</video:description>\n`;
    xml += `      <video:content_loc>${video.content}</video:content_loc>\n`;
    xml += `      <video:player_loc>${video.player}</video:player_loc>\n`;
    xml += `      <video:duration>${video.duration}</video:duration>\n`;
    xml += `      <video:publication_date>${video.publication_date}</video:publication_date>\n`;
    xml += '      <video:family_friendly>yes</video:family_friendly>\n';
    xml += '      <video:live>no</video:live>\n';
    xml += '    </video:video>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(path.join(process.cwd(), 'public', 'video-sitemap.xml'), xml);
  console.log('Video sitemap generated successfully!');
};

generateVideoSitemap();
