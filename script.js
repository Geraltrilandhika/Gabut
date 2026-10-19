document.addEventListener('DOMContentLoaded', () => {
  const messages = {
    miss: ['Kangen yaaa? Sini, kirim kangen dulu lewat layar 🤎','Kalau bisa teleport, udah nyamperin kamu sekarang 🥺','Kangen boleh, tapi jangan lupa senyum juga yaa ♡'],
    hug: ['Peluk virtual duluuu 🫂🤎 semoga hangatnya sampai!','Siniii, peluk boneka dulu sambil bayangin pelukan hangat 🧸','Hug delivered! 📦 Isinya sayang banyak-banyak.'],
    secret: ['Rahasia pertama: kamu punya tempat spesial di cerita ini 💌','Rahasia kedua: foto wisuda kita bakal jadi kenangan favorit 🤎','Rahasia ketiga: jangan bosen bikin kenangan baru bareng aku ✨'],
    praise: ['Cantik donggg, apalagi pas senyum 🥹🎀','Kamu spesial dengan caramu sendiri, jangan lupa itu yaa 🤎','Jawabannya iyaaa, sekarang jangan malu-malu lagi wkwk ♡'],
    again: ['Meowww 🐱 masih mau dimanja lagi?','Bonus satu hati buat kamuuu 🤎','Kamu ketahuan suka pencet pesan rahasia nih wkwk ✨']
  };
  const result = document.getElementById('love-result');
  document.querySelectorAll('.chip[data-love]').forEach(button => button.addEventListener('click', () => {
    const choices = messages[button.dataset.love]; if (!choices || !result) return;
    const old = result.querySelector('p')?.textContent || '';
    let available = choices.filter(item => item !== old); if (!available.length) available = choices;
    result.replaceChildren(); const icon = document.createElement('span'); icon.textContent = '✨';
    const p = document.createElement('p'); p.textContent = available[Math.floor(Math.random()*available.length)]; result.append(icon,p);
    result.classList.remove('pop'); void result.offsetWidth; result.classList.add('pop'); floaties(5);
  }));
  const catTexts = ['Meow meow! Ada kiriman sayang dari Mochi & Mimi 🤎','Kucingnya bilang: jangan lupa senyum hari ini yaa 🐾','Purr purr... kamu lagi dikirimin peluk virtual 🫂','Mochi sama Mimi sepakat: kamu orang yang spesial! 🐱','Misi kucing: bikin kamu senyum minimal sekali hari ini ✨'];
  document.querySelectorAll('.cat').forEach(cat => cat.addEventListener('click', () => {
    const msg = document.getElementById('cat-message'); if (msg) msg.textContent = `${cat.dataset.cat} bilang: ${catTexts[Math.floor(Math.random()*catTexts.length)]}`;
    cat.animate([{transform:'scale(1)'},{transform:'scale(1.13) rotate(-4deg)'},{transform:'scale(1)'}],{duration:450,easing:'ease-out'}); floaties(7);
  }));
  const toggle = document.getElementById('letter-toggle'), card = document.getElementById('letter-card');
  if (toggle && card) toggle.addEventListener('click', () => { const open = card.classList.contains('hidden'); card.classList.toggle('hidden'); toggle.textContent = open ? 'Tutup cenggg 🔒' : 'Buka cenggg 🔑'; toggle.setAttribute('aria-expanded',String(open)); if(open) floaties(8); });
  const audio = document.getElementById('loveSong'), musicButton = document.getElementById('music-toggle'), status = document.getElementById('music-status');

  // HALAMAN PEMBUKA:
  // Tombol ini membuka website utama dan mencoba memutar musik.
  const introScreen = document.getElementById('intro-screen');
  const enterButton = document.getElementById('enter-website');

  document.body.classList.add('intro-open');

  if (introScreen && enterButton) {
    enterButton.addEventListener('click', async () => {
      introScreen.classList.add('is-hidden');
      document.body.classList.remove('intro-open');

      // Browser biasanya mengizinkan autoplay setelah tombol diklik.
      if (audio) {
        try {
          await audio.play();

          if (musicButton) {
            musicButton.textContent = '❚❚ Jeda musik';
          }

          if (status) {
            status.textContent = 'Musik sedang diputar ♫';
          }
        } catch {
          if (status) {
            status.textContent =
              'Musik belum bisa diputar. Coba tekan tombol putar musik ya 🤎';
          }
        }
      }

      floaties(12);
    });
  }

  if (audio && musicButton) musicButton.addEventListener('click', async () => {
    if (audio.paused) { try { await audio.play(); musicButton.textContent='❚❚ Jeda musik'; if(status) status.textContent='Musik sedang diputar ♫'; } catch { if(status) status.textContent='Masukkan file musik ke folder music dengan nama lagu.mp3 dulu, ya 🤎'; } }
    else { audio.pause(); musicButton.textContent='▶ Putar musik'; if(status) status.textContent='Musik dijeda.'; }
  });
  function floaties(count=5) { const layer=document.getElementById('floating-layer'); if(!layer)return; const symbols=['♡','🤎','✦','🐾','✨']; for(let i=0;i<count;i++){const item=document.createElement('span');item.className='floating-item';item.textContent=symbols[Math.floor(Math.random()*symbols.length)];item.style.left=(4+Math.random()*92)+'%';item.style.fontSize=(16+Math.random()*18)+'px';item.style.animationDuration=(3+Math.random()*2)+'s';layer.appendChild(item);item.addEventListener('animationend',()=>item.remove(),{once:true});} }
  setInterval(() => floaties(1), 2600);
});
