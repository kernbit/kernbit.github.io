document.addEventListener('DOMContentLoaded', () => {
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');
  const termWelcome = document.getElementById('term-welcome');

  let currentDir = '~';
  let commandHistory = [];
  let historyIndex = -1;

  const WELCOME_TEXT = `
██╗  ██╗███████╗██████╗ ███╗   ██╗██████╗ ██╗████████╗
██║ ██╔╝██╔════╝██╔══██╗████╗  ██║██████╔╝██║╚══██╔══╝
█████╔╝ █████╗  ██████╔╝██╔██╗ ██║██████╔╝██║   ██║   
██╔═██╗ ██╔══╝  ██╔══██╗██║╚██╗██║██╔══██╗██║   ██║   
██║  ██╗███████╗██║  ██║██║ ╚████║██████╔╝██║   ██║   
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝   ╚═╝   

Type 'help' for available commands.
  `;
  
  // Static music data
  const staticMusicData = {
    currentTrack: {
      name: "Terminal Dreams",
      artist: "Code Runner",
      album: "Debug Sessions",
      image: "https://placehold.co/300x300/111/727cf5?text=Terminal+Dreams"
    },
    recentTracks: [
      { name: "Kernel Panic", artist: "Binary Shift", album: "Segmentation Fault" },
      { name: "Algorithm Dance", artist: "The Recursives", album: "Stack Overflow" },
      { name: "Memory Leak", artist: "Garbage Collector", album: "Free Memory" }
    ],
    stats: {
      playcount: "14,528",
      topArtist: "Code Runner"
    }
  };
  
  const data = {
    notes: [
      { 
        name: 'linux_kernel_notes.txt', 
        url: '#', 
        date: '2025-04-15', 
        size: '4.2K' 
      },
      {
        name: 'rust_optimization.md', 
        url: '#', 
        date: '2025-05-01',
        size: '8.1K'
      },
      {
        name: 'efficient_algorithms.txt', 
        url: '#', 
        date: '2025-03-22',
        size: '12K'
      }
    ],
    contacts: [
      { type: 'email', value: 'kernbit@example.com' },
      { type: 'twitter', value: '@kernbit' },
      { type: 'github', value: 'github.com/kernbit' },
      { type: 'discord', value: 'kernbit#1337' }
    ],
    friends: [
      { name: 'ByteMaster', role: 'Backend Developer', status: 'online' },
      { name: 'TerminalGuru', role: 'Linux Expert', status: 'offline' },
      { name: 'RustyCrab', role: 'Rust Developer', status: 'online' },
      { name: 'PixelArtist', role: 'UI/UX Designer', status: 'offline' }
    ],
    whoami: `
kernbit@web:~$ whoami
kernbit - Linux kernel & systems engineer

█ Bio
I'm a systems programmer passionate about low-level code and optimizations.
I specialize in kernel development and embedded systems programming.

█ Skills & Tech
C/C++, Rust, Assembly, Linux, Kernel, Embedded, Networking

█ Interests
Computer architecture, OS design, cryptography, retro computing

█ Status
Currently working on custom file system implementations and
kernel-level optimizations for high-performance computing.

Website: kernbit.dev
`
  };

  function showMusicWidget() {
    if (document.getElementById('music-widget')) {
      return "<div class='error'>Music widget is already displayed</div>";
    }
    
    const musicWidget = document.createElement('div');
    musicWidget.id = 'music-widget';
    musicWidget.className = 'music-widget';
    
    musicWidget.innerHTML = `
      <div class="section-title">Now Playing</div>
      <div class="music-content">
        <div class="music-row">
          <img id="album-cover" src="${staticMusicData.currentTrack.image}" alt="Album cover">
          <div class="track-info">
            <div id="track-title">${staticMusicData.currentTrack.name}</div>
            <div id="track-artist">${staticMusicData.currentTrack.artist} - ${staticMusicData.currentTrack.album}</div>
            <div id="progress-bar-bg">
              <div id="progress-bar"></div>
            </div>
          </div>
        </div>
        
        <div class="music-stats">
          <div class="stat-row">
            <span class="stat-label">Scrobbles:</span>
            <span id="total-scrobbles" class="stat-value">${staticMusicData.stats.playcount}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Top Artist:</span>
            <span id="top-artist" class="stat-value">${staticMusicData.stats.topArtist}</span>
          </div>
        </div>
        
        <div id="recent-tracks">
          <div class="track-list-title">Recent tracks:</div>
          <div id="track-list">
            ${staticMusicData.recentTracks.map(track => `
              <div class="track-item">
                <div class="track-item-title">${track.name}</div>
                <div class="track-item-artist">${track.artist} - ${track.album}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    termOutput.appendChild(musicWidget);
    
    // Animate progress bar
    let progress = 0;
    setInterval(() => {
      progress = (progress + 1) % 100;
      document.getElementById('progress-bar').style.width = progress + '%';
    }, 1000);
    
    return "";
  }

  function generateFastfetchOutput() {
    const fastfetchLogo = `      ,.........\\
     /           ;
    /            :
   |'            :
   |_            :
   : ".          ;
    \`."-.       :
     \\   ".    /
      \\    ". /
       \\     ;
        \.   :
         )  /
       ."' /
      (_.-'`;

    const uptimeDays = Math.floor(Math.random() * 30) + 1;
    const uptimeHours = Math.floor(Math.random() * 24);
    const uptimeMinutes = Math.floor(Math.random() * 60);
    
    const kernelVersion = "6.9.0-custom";
    const packages = Math.floor(Math.random() * 1000) + 500;
    const shell = "zsh (hypercustom)";
    const resolution = `${window.innerWidth}x${window.innerHeight}`;
    
    return `
<div class="fastfetch-output">
  <pre class="fastfetch-logo">${fastfetchLogo}</pre>
  
  <div class="fastfetch-line">
    <span class="fastfetch-key">OS:</span>
    <span class="fastfetch-value">kernbit Linux (Personal Web)</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Host:</span>
    <span class="fastfetch-value">Digital Dream Machine</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Kernel:</span>
    <span class="fastfetch-value">${kernelVersion}</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Uptime:</span>
    <span class="fastfetch-value">${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Packages:</span>
    <span class="fastfetch-value">${packages}</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Shell:</span>
    <span class="fastfetch-value">${shell}</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Resolution:</span>
    <span class="fastfetch-value">${resolution}</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Terminal:</span>
    <span class="fastfetch-value">Web Terminal ${navigator.userAgent.includes("Firefox") ? "on Firefox" : navigator.userAgent.includes("Chrome") ? "on Chrome" : "on Web Browser"}</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">CPU:</span>
    <span class="fastfetch-value">Dedication++ @ 100%</span>
  </div>
  <div class="fastfetch-line">
    <span class="fastfetch-key">Memory:</span>
    <span class="fastfetch-value">${Math.floor(Math.random() * 8) + 2}GB / ${Math.floor(Math.random() * 8) + 16}GB</span>
  </div>
</div>
    `;
  }

  function processCommand(command) {
    const cmd = command.trim();
    
    if (cmd === '') return;
    
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;
    
    let output = '';
    const parts = cmd.split(' ');
    const mainCommand = parts[0].toLowerCase();
    
    switch(mainCommand) {
      case 'help':
        output = `
<div class="section-title">Available Commands</div>
<div class="help-item"><span class="help-cmd">whoami</span> <span>Display information about me</span></div>
<div class="help-item"><span class="help-cmd">about</span> <span>Display information about me</span></div>
<div class="help-item"><span class="help-cmd">notes</span> <span>List my notes and writings</span></div>
<div class="help-item"><span class="help-cmd">contacts</span> <span>Show my contact information</span></div>
<div class="help-item"><span class="help-cmd">friends</span> <span>List my network connections</span></div>
<div class="help-item"><span class="help-cmd">music</span> <span>Show music widget</span></div>
<div class="help-item"><span class="help-cmd">fastfetch</span> <span>Display system information</span></div>
<div class="help-item"><span class="help-cmd">clear</span> <span>Clear the terminal</span></div>
<div class="help-item"><span class="help-cmd">ls</span> <span>List items in current directory</span></div>
<div class="help-item"><span class="help-cmd">cd</span> <span>Change directory</span></div>
<div class="help-item"><span class="help-cmd">pwd</span> <span>Show current directory</span></div>
<div class="help-item"><span class="help-cmd">echo</span> <span>Display text</span></div>
<div class="help-item"><span class="help-cmd">date</span> <span>Show current date and time</span></div>
        `;
        break;
        
      case 'whoami':
      case 'about':
        output = `<pre>${data.whoami}</pre>`;
        break;
        
      case 'fastfetch':
        output = generateFastfetchOutput();
        break;
        
      case 'notes':
        output = `<div class="section-title">My Notes</div>`;
        output += `<div class="output-line">total ${data.notes.length}</div>`;
        
        output += `<div class="output-line">`;
        data.notes.forEach(note => {
          output += `
<div class="dir-item file">
  ${note.date} ${note.size} <a href="${note.url}" class="file-link">${note.name}</a>
</div>`;
        });
        output += `</div>`;
        break;
        
      case 'contacts':
        output = `<div class="section-title">Contact Information</div>`;
        data.contacts.forEach(contact => {
          output += `
<div class="contact-item">
  <span class="contact-label">${contact.type}:</span>
  <span class="contact-value">${contact.value}</span>
</div>`;
        });
        break;
        
      case 'friends':
        output = `<div class="section-title">Network Connections</div>`;
        data.friends.forEach(friend => {
          output += `
<div class="friend-item">
  <div class="friend-status ${friend.status}"></div>
  <div class="friend-name">${friend.name}</div>
  <div class="friend-role">${friend.role}</div>
</div>`;
        });
        break;
        
      case 'music':
        output = showMusicWidget();
        break;
        
      case 'clear':
        termOutput.innerHTML = '';
        return;
        
      case 'ls':
        output = `
<div class="dir-item directory">about</div>
<div class="dir-item directory">contacts</div>
<div class="dir-item directory">friends</div>
<div class="dir-item directory">music</div>
<div class="dir-item directory">notes</div>`;
        break;
        
      case 'cd':
        if (parts.length === 1) {
          currentDir = '~';
          output = '';
        } else {
          const dir = parts[1];
          if (dir === '/' || dir === '~' || dir === '..' || 
              ['about', 'contacts', 'friends', 'music', 'notes'].includes(dir)) {
            if (dir === '..') {
              currentDir = '~';
            } else if (dir === '/') {
              currentDir = '/';
            } else if (dir === '~') {
              currentDir = '~';
            } else {
              currentDir = dir;
            }
            output = '';
          } else {
            output = `<div class="error">cd: no such directory: ${dir}</div>`;
          }
        }
        break;
        
      case 'pwd':
        if (currentDir === '~') {
          output = '/home/kernbit';
        } else if (currentDir === '/') {
          output = '/';
        } else {
          output = `/home/kernbit/${currentDir}`;
        }
        break;
        
      case 'date':
        const now = new Date();
        output = `Current date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        break;
        
      case 'echo':
        output = parts.slice(1).join(' ');
        break;
        
      default:
        output = `<div class="error">Command not found: ${mainCommand}</div>`;
    }
    
    const commandOutput = document.createElement('div');
    commandOutput.innerHTML = `
<div class="term-line">
  <span class="term-prompt"><span class="user">kernbit</span>:<span class="dir">${currentDir}</span>$</span> 
  <span>${cmd}</span>
</div>
<div class="output-line">${output}</div>
    `;
    
    termOutput.appendChild(commandOutput);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const command = termInput.value;
      processCommand(command);
      termInput.value = '';
      e.preventDefault();
    }
    else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    }
    else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = '';
      }
      e.preventDefault();
    }
    else if (e.key === 'Tab') {
      const input = termInput.value.trim().toLowerCase();
      const commands = ['about', 'notes', 'contacts', 'friends', 'music', 'clear', 'ls', 'cd', 'pwd', 'echo', 'whoami', 'help', 'fastfetch', 'date'];
      
      for (let cmd of commands) {
        if (cmd.startsWith(input)) {
          termInput.value = cmd;
          break;
        }
      }
      e.preventDefault();
    }
  }

  termInput.addEventListener('keydown', handleKeyDown);
  termWelcome.innerHTML = WELCOME_TEXT;
  termInput.focus();

  document.addEventListener('click', () => {
    termInput.focus();
  });
});
