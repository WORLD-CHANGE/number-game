import React, { useState, useEffect } from 'react';

function App() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('1부터 100 사이의 숫자를 맞춰보세요!');
    setAttempts(0);
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('1부터 100 사이의 숫자를 입력해주세요!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userGuess === targetNumber) {
      setMessage(`🎉 정답입니다! ${newAttempts}번 만에 맞추셨네요!`);
      setGameOver(true);
      const points = Math.max(110 - newAttempts * 10, 10);
      setScore(score + points);
    } else if (userGuess < targetNumber) {
      setMessage(`📈 더 큰 숫자입니다! (시도: ${newAttempts}번)`);
    } else {
      setMessage(`📉 더 작은 숫자입니다! (시도: ${newAttempts}번)`);
    }

    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        padding: '30px',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            🎯 숫자 맞추기
          </h1>
          <p style={{ color: '#666' }}>1부터 100까지의 숫자를 맞춰보세요!</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333' }}>{message}</p>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '20px'
          }}>
            <span>시도 횟수: {attempts}</span>
            <span>점수: {score}</span>
          </div>
        </div>

        {!gameOver ? (
          <div>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="숫자를 입력하세요"
              min="1"
              max="100"
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1.2rem',
                textAlign: 'center',
                marginBottom: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              onClick={handleGuess}
              style={{
                width: '100%',
                backgroundColor: '#4285f4',
                color: 'white',
                fontWeight: 'bold',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              추측하기!
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              marginBottom: '20px',
              padding: '20px',
              backgroundColor: '#d4edda',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#155724', fontWeight: '600' }}>게임 완료!</p>
              <p style={{ color: '#155724' }}>정답: {targetNumber}</p>
            </div>
            <button
              onClick={initGame}
              style={{
                width: '100%',
                backgroundColor: '#28a745',
                color: 'white',
                fontWeight: 'bold',
                padding: '15px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              새 게임 시작
            </button>
          </div>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#999' }}>
            <p>💡 팁: 적은 횟수로 맞출수록 높은 점수를 받아요!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;