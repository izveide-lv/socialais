import { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; // Importamos el componente Modal
import AudioPlayer from './AudioPlayer'; // Importamos el componente AudioPlayer
import fileSystem from '../utils/fileSystem';

const Terminal = () => {
  const [commandHistory, setCommandHistory] = useState([]);
  const [dirHistory, setDirHistory] = useState([{ path: ' ~' }]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Estado para abrir el modal
  const [playerOpen, setPlayerOpen] = useState(false); // Estado para abrir el modal
  const [imageSrc, setImageSrc] = useState(''); // Estado para la URL de la imagen
  const [audioSrc, setAudioSrc] = useState(''); // Estado para la URL del archivo de audio

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
    return `${dir}/${relativePath}`.replace(/\/+/g, '/'); // Manejo de slashes redundantes
  };

  const handleCommand = (command) => {
    let NotInHistory;
    const trimmedCommand = command.trim();
    const [baseCommand, ...args] = trimmedCommand.split(' ');
    let response = '';

    switch (baseCommand) {
      case 'ls': {
        const dirContent = fileSystem[currentDir] || [];
        response = (
          <div>
            {dirContent.map((item, index) => {
              const fullPath = `${currentDir}/${item}`;
              const isDirectory = Array.isArray(fileSystem[fullPath]); // Verifica si es un directorio
              return (
                <span
                  key={index}
                  className={isDirectory ? 'text-blue-600 ml-2' : 'text- ml-2'}
                >
                  {item}{' '}
                </span>
              );
            })}
          </div>
        );
        break;
      }
      case 'pwd':
        response = currentDir.replace('~', '/home/user');
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'help':
        response = 'Available commands: ls, pwd, date, help, clear, cd, cat, history, open-image, play-audio';
        break;
      case 'echo':
        response = args.join(' ');
        break;
      case 'history':
        NotInHistory = true;
        response = commandHistory
          .map((command, index) => `${index + 1}. ${command}`)
          .join('\n');
        break;
      case 'clear':
        setCommandHistory((prevHistory) => [...prevHistory, trimmedCommand]);
        setOutput([]);
        setInput('');
        return;
      case 'cd': {
        const newDir = args.join(' ').trim();
        const targetPath = resolvePath(currentDir, newDir);

        if (newDir === '' || newDir === '/') {
          setDirHistory((prevHistory) => [...prevHistory, { path: ' ~' }]);
        } else if (fileSystem[targetPath] && Array.isArray(fileSystem[targetPath])) {
          setDirHistory((prevHistory) => [...prevHistory, { path: targetPath }]);
        } else {
          response = `bash: cd: ${newDir}: No such directory`;
        }
        break;
      }
      case 'cat': {
        const fileName = args.join(' ').trim();
        const filePath = resolvePath(currentDir, fileName);

        if (fileSystem[filePath] && typeof fileSystem[filePath] === 'string') {
          response = fileSystem[filePath];
        } else {
          response = `bash: cat: ${fileName}: No such file`;
        }
        break;
      }
      case 'rm': {
        const whatAreYouDoing = args[0] + args[1]; // Concatenar los argumentos para verificar
        if (whatAreYouDoing === '-rf/') {
          response = 'bash: Your computer will be destroyed... just kidding! 😂';
          response += ' ¿What are you doing?';
        } else {
          response = 'bash: You dont have permission to delete anything.';
        }
        break;
      }
      case 'open-image': {
        const imageName = args.join(' ').trim();
        const imagePath = resolvePath(currentDir, imageName);
        if (fileSystem[imagePath] && typeof fileSystem[imagePath] === 'string') {
          setImageSrc(fileSystem[imagePath]); // Si la imagen existe, se establece la URL
          setModalOpen(true); // Abrimos el modal
          response = `Opening image: ${imageName}`;
        } else {
          response = `bash: open-image: ${imageName}: No such file`;
        }
        break;
      }
      case 'play-audio': {
        const audioFile = args.join(' ').trim();
        const audioPath = resolvePath(currentDir, audioFile);
        if (fileSystem[audioPath] && typeof fileSystem[audioPath] === 'string') {
          setAudioSrc(fileSystem[audioPath]);
          setPlayerOpen(true)
          response = `Playing audio: ${audioFile}`;
        } else {
          response = `bash: play-audio: ${audioFile}: No such file`;
        }
        break;
      }
      case '': {
        NotInHistory = true;
        break;
      }
      default:
        response = `bash: ${baseCommand}: command not found`;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { command: trimmedCommand, response, dir: currentDir },
    ]);
    setInput('');

    // si no es un comando válido, no lo quiero en el historial
    if (NotInHistory) return;
    if (response !== `bash: ${baseCommand}: command not found`) {
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

  return (
    <div className="h-screen w-full bg-bash text-white p-4 flex flex-col flex-start"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#38112e #38112e',
      }}>
      {/* Área de salida */}
      <div className="output overflow-y-auto whitespace-pre-wrap break-words sm:text-2xl mb-4" ref={outputRef}>
        {output.map((entry, index) => (
          <div className="mb-2" key={index}>
            <div>
              <span className="text-green-500">user@astro: </span>
              <span className="text-blue-600 font-semibold">{entry.dir} </span>
              <span className="text-white">$ {entry.command}</span>
            </div>
            {entry.response && (
              <div className="text-white m-2">{entry.response}</div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && <Modal imageSrc={imageSrc} closeModal={closeModal} />}

      {/* Reproductor de audio */}
      {playerOpen && <AudioPlayer audioSrc={audioSrc} closePlayer={closePlayer}/>}

      {/* Área de entrada */}
      <div className="prompt flex items-center space-x-2 sm:text-2xl">
        <span className="text-green-500">user@astro:</span>
        <span className="text-blue-600 font-semibold">{currentDir}</span>
        <span className="text-white">$</span>
        <input
          type="text"
          id="prompt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand(input);
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
