const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// 네이버 사용자 정보 프록시
app.get('/api/naveropen/v1/nid/me', async (req, res) => {
  try {
    console.log('프록시 요청 받음:', req.headers.authorization);
    
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.text();
    console.log('네이버 응답:', response.status, data.slice(0, 100));
    
    res.status(response.status).send(data);
  } catch (error) {
    console.error('프록시 에러:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('프록시 서버가 http://localhost:3001 에서 실행 중');
});