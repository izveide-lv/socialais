import { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; 
import AudioPlayer from './AudioPlayer'; 
import VideoPlayer from './VideoPlayer';
import fileSystem from '../utils/fileSystem';


const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [dirHistory, setDirHistory] = useState([{ path: ' ~' }]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const [playerOpen, setPlayerOpen] = useState(false); 
  const [videoOpen,setVideoOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(''); 
  const [audioSrc, setAudioSrc] = useState(''); 
  const [videoSrc, setVideoSrc] = useState('')
  const outputRef = useRef(null);

  const currentDir = dirHistory[dirHistory.length - 1].path;

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const resolvePath = (dir, relativePath) => {
    if (relativePath === '..') {
      return dir.split('/').slice(0, -1).join('/') || '/';
    }
    if (relativePath.startsWith('/')) {
      return relativePath;
    }
    return `${dir}/${relativePath}`.replace(/\/+/g, '/');
  };

  const uncapitalize = (str) => {
    // Return the input string with its first character converted to lowercase,
    // concatenated with the rest of the string starting from the second character
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const handleCommand = (command) => {
    let NotInHistory;
    const trimmedCommand = command.trim();
    const [baseCommand, ...args] = trimmedCommand.split(' ');
    let response = '';
    const lowercaseCommand = uncapitalize(baseCommand);
    switch (lowercaseCommand) {
      case 'kas': {
        const dirContent = fileSystem[currentDir] || [];
        response = (
          <div>
            {dirContent.map((item, index) => {
              const fullPath = `${currentDir}/${item}`;
              const isDirectory = Array.isArray(fileSystem[fullPath]); // Verifica si es un directorio
              return (
                <span
                  key={index}
                  className={isDirectory ? 'text-white ml-2' : 'text- ml-2'}
                >
                  {item}{' '}
                </span>
              );
            })}
          </div>
        );
        break;
      }
      case 'kur':
        response = currentDir.replace('~', '/Sociālais/kods');
        break;
      case 'kad':
        response = new Date().toLocaleString();
        break;
      case 'lol':
        response = ':)';
        break;
      case 'sudo':
          response = 'labs mēģinājums, bet šeit tas nedarbosies';
        break;
      case 'rm':
          response = 'vai tas ir nepieciešams?';
        break;  
      case 'kods':
          response = 'github.com/izveide-lv/socialais';
        break;   
      case 'paldies':
        response = 'nav par ko!';
        break;
      case 'iziet':
        response = 'paldies, ka paviesojies! uz redzēšanos!';
        break;
      case 'cik': 
        const price = Math.floor(Math.random() * 600 + 900).toString();
        response = `Piesakies šodien un izveidosim statisku vizītkartes tipa mājaslapu par €${price}. 
Lai pieteiktos, raksti uz kods@socialais.dev un pievieno ekrānšāviņu ar šo ziņu.`;
        break  
      case 'kā':
      case '?':
      case 'nesaprotu':    
        response = `
Pieejamās komandas:
-------------------
- cik:   Izveides izmaksas
- kas:   Parāda mapes
- kur:   Parāda vietu
- kad:   Parāda laiku
- kā:    Parāda šo ziņu
- prom:  Notīra ekrānu
- uz:    Maina vietu (← /)
- lasi:  Nolasa failu
- ko:    Parāda komandu vēsturi
- saki:  Atkārto ievadīto tekstu
- dzēs:  Dzēš failu (nav atļauts)
-------------------
Piemērs: raksti "uz Atsauksmes" un "lasi alise", lai redzētu Alises atsauksmi.
Pēc tam raksti "uz /", lai atgrieztos sākumā, "uz Par" un "lasi uzņēmums".
    `;
        break;
        case 'saki':
          const environmentVariables = {
            "kas": 'Sociālais kods',
            "kur": 'socialais.dev',
            "kad": new Date().toLocaleString(),
          };
          response = args
          .join(' ')
          .replace(/["']/g, '') 
          .replace(/(\w+)/g, (match, varName) => environmentVariables[`${varName}`] || match);
        break;    
      case 'ko':
        response = commandHistory
          .map((command, index) => `${index + 1}  ${command}`)
          .join('\n');
        break;
      case 'prom':
        setCommandHistory((prevHistory) => [...prevHistory, trimmedCommand]);
        setOutput([]);
        setInput('');
        return;
      case 'uz': {
        const newDir = args.join(' ').trim();
        const targetPath = resolvePath(currentDir, newDir);

        if (newDir === '' || newDir === '/') {
          setDirHistory((prevHistory) => [...prevHistory, { path: ' ~' }]);
        } else if (fileSystem[targetPath] && Array.isArray(fileSystem[targetPath])) {
          setDirHistory((prevHistory) => [...prevHistory, { path: targetPath }]);
        } else {
          response = `kods: uz: "${newDir}" mape neeksistē`;
        }
        break;
      }
      case 'lasi': {
        const fileName = args.join(' ').trim();
        const filePath = resolvePath(currentDir, fileName);

        if (fileSystem[filePath] && typeof fileSystem[filePath] === 'string') {
          response = fileSystem[filePath];
        
        } else {
          response = `kods: lasi: "${fileName}" fails neeksistē`;
        }
        break;
      }
      case 'dzēs': {
        if (args[0] === '-rf') {
          response = 'kods: ak, šausmas... tu zini šo komandu?';
          response += ' par laimi, šeit tā nedarbojas.';
        } else {
          response = 'kods: jums nav atļaujas dzēst šo failu';
        }
        break;
      }
      // case 'open-image': {
      //   const imageName = args.join(' ').trim();
      //   const imagePath = resolvePath(currentDir, imageName);
      //   if (fileSystem[imagePath] && typeof fileSystem[imagePath] === 'string') {
      //     setImageSrc(fileSystem[imagePath]); // Si la imagen existe, se establece la URL
      //     setModalOpen(true); // Abrimos el modal
      //     response = `Opening image: ${imageName}`;
      //   } else {
      //     response = `bash: open-image: ${imageName}: No such file`;
      //   }
      //   break;
      // }
      // case 'play-audio': {
      //   const audioFile = args.join(' ').trim();
      //   const audioPath = resolvePath(currentDir, audioFile);
      //   if (fileSystem[audioPath] && typeof fileSystem[audioPath] === 'string') {
      //     setAudioSrc(fileSystem[audioPath]);
      //     setPlayerOpen(true)
      //     response = `Playing audio: ${audioFile}`;
      //   } else {
      //     response = `bash: play-audio: ${audioFile}: No such file`;
      //   }
      //   break;
      // }
      // case 'play-video': {
      //   const videoFile = args.join(' ').trim();
      //   const videoPath = resolvePath(currentDir, videoFile);
      //   if (fileSystem[videoPath] && typeof fileSystem[videoPath] === 'string') {
      //     setVideoSrc(fileSystem[videoPath]); // Configura la URL del video
      //     setVideoOpen(true); // Abre el reproductor de video
      //     response = `Playing video: ${videoFile}`;
      //   } else {
      //     response = `bash: play-video: ${videoFile}: No such file`;
      //   }
      //   break;
      // }
      case 'test':
        response = 'kods: pamēģini rakstīt "kā", lai uzzinātu kādas komandas ir pieejamas';
        break;
      case '': {
        NotInHistory = true;
        break;
      }
      default:
        response = `kods: ${baseCommand}: komanda nav atrasta. raksti "kā", lai uzzinātu kādas komandas ir pieejamas`;
    }

    umami.track(props => ({ ...props, name: baseCommand, data: { command: trimmedCommand } }));

    setOutput((prevOutput) => [
      ...prevOutput,
      { command: trimmedCommand, response, dir: currentDir },
    ]);
    setInput('');

    if (NotInHistory) return;
    if (response !== `kods: ${baseCommand}: komanda nav atrasta`) {
      setCommandHistory((prevHistory) => [...prevHistory, trimmedCommand]);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setImageSrc('');
  };
  const closePlayer = () => {
    setPlayerOpen(false);
    setAudioSrc('');
  };
  const closeVideoPlayer = () => {
    setVideoOpen(false);
    setVideoSrc('');
  };

  return (
    <div className="h-screen w-full bg-[#062782] text-white p-4 flex flex-col flex-start"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cf3812 white',
      }}>
         <img
      src="/logo-socialais-kods--animated.svg"
      alt="Sociālais kods"
      class="opacity-15 z-0 pointer-events-none fixed max-w-[320px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
      <div className="output overflow-y-auto whitespace-pre-wrap break-words sm:text-2xl mb-4" ref={outputRef}>
        {output.map((entry, index) => (
          <div className="mb-2" key={index}>
            <div>
              <span className="text-[#cf3812] opacity-60">lietotājs</span>
              <span className="text-white opacity-60">:</span>
              <span className="text-[#faede3] font-semibold opacity-60">{entry.dir}</span>
              <span className="text-white opacity-60">$ {entry.command}</span>
            </div>
            {entry.response && (
              <div className="text-white m-2">{entry.response}</div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && <Modal imageSrc={imageSrc} closeModal={closeModal} />}

      {playerOpen && <AudioPlayer audioSrc={audioSrc} closePlayer={closePlayer}/>}
      
      {videoOpen && (<VideoPlayer videoSrc={videoSrc} closeVideoPlayer={closeVideoPlayer} />)}

      <div className="prompt flex items-center sm:text-2xl">
        <span className="text-[#cf3812]">lietotājs</span>
        <span className="text-white">:</span>
        <span className="text-[#faede3] font-semibold pl-1">{currentDir}</span>
        <span className="text-white mr-2">$</span>
        <input
          type="text"
          id="prompt"
          autoCorrect="off" 
          autoCapitalize="none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setHistoryIndex(-1);
            } else if (e.key === 'ArrowUp') {
              if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
              }
            } else if (e.key === 'ArrowDown') {
              if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
              } else {
                setHistoryIndex(-1);
                setInput('');
              }
            }
          }}
          className="bg-transparent border-none outline-none text-white w-full sm:text-2xl font-semibold"
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
