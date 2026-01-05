import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function App({AnimationRef}) {
  return (
    <div style={{ width: '50%', height: '50%', mixBlendMode: 'multiply' }}>
      <DotLottieReact
        dotLottieRefCallback={(dotLottie) => {
          AnimationRef.current = dotLottie;
        }}
        src="https://lottie.host/54912f4e-b957-4d70-baa0-dbb0db387037/PsLs2wr9Sy.lottie"
        autoplay={false}
      />
    </div>
  );
}

export default App;
