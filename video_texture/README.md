# 동영상을 텍스쳐로 사용하기

## 실행 전 주의
- 일부 브라우저에서는 CORS 관련해 보안 상의 이유로 local에 있는 동영상 파일을 표출하는 것이 불가합니다. 
- 이 경우 동영상 파일을 base64로 바꾸어 코드에 넣어야 하는 등의 방법이 있는데 동영상의 용량이 크고 동영상 변경 기능을 구현할 수 없어 이 코드에는 넣지 않았습니다.
- 따라서, Chrome 등 일부 브라우저에서는 동영상이 뜨지 않고 파란색 큐브만 돌아가는 등 실행이 어렵습니다.
- **Microsoft Edge에서는 정상적으로 실행되는 것을 확인하였습니다.**

## 기능
- 큐브에 동영상 텍스쳐를 입힌다.
- 동영상을 선택하여 해당 동영상으로 텍스쳐를 변경할 수 있다.
- 동영상의 재생 속도를 조절하고 멈출 수 있는 버튼을 만든다.

## 의도
- 동영상 텍스쳐를 입히는 방법과 입힌 동영상의 속성을 조절하는 방법, 다른 동영상을 선택하여 자유자재로 텍스쳐를 변경하는 방법을 학습한다.

<br>

## 코드 설명
### 큐브에 동영상 텍스쳐 입히기
- 먼저 Video Element를 생성한다.
```
const video = document.createElement('video');
```
- 비디오의 속성을 지정한다.
- autoplay가 true일 경우 비디오는 재생 버튼을 누르지 않아도 자동으로 재생되기 시작한다.
- muted가 true일 경우 비디오는 음소거로 재생된다.
- loop가 true일 경우 비디오 종료 시 다시 처음부터 재생된다.
```
video.autoplay = true;
video.muted = true;
video.loop = true;
video.play();
```
- 비디오가 안전하게 재생되기 위하여 두 개의 이벤트 후 재생시킨다.
- 두 개의 이벤트 후 copyVideo 변수를 true로 만든다.
```
video.addEventListener('playing', function() {
  playing = true;
  checkReady();
}, true);

video.addEventListener('timeupdate', function() {
  timeupdate = true;
  checkReady();
}, true);

function checkReady() {
  if (playing && timeupdate) {
    copyVideo = true;
  }
}
```
- copyVideo 변수가 true가 되면 큐브에 비디오를 텍스쳐로 입혀서 나타나게 한다.
```
if (copyVideo) {
  updateTexture(gl, texture, video);
}
function updateTexture(gl, texture, video) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
}
```

### 선택한 동영상으로 재생시키기
- index.html에 file 타입의 input tag를 만든다.
```
<input type="file" id="myVideo">
```
- 사용자가 새로운 비디오 파일을 선택하면 이를 감지해 새 동영상으로 바꾼다.
- 이떄 document.getElementById().value를 사용할 경우 중간 경로가 /fakepath/로 바뀌므로 주의한다.
```
changeVideo.addEventListener('change',function() {
  video.src = document.getElementById('myVideo').files[0].name;
}, true);
```

### 비디오 멈추게 하기
- index.html에 file 타입의 input tag를 만든다.
```
<button id="pause">Play/Pause</button>
```

- 버튼을 클릭하는 것을 감지하여 비디오가 멈추어 있을 경우 재생하고, 비디오가 재생되는 중에는 멈추도록 한다.
```
const pauseVideo = document.getElementById('pause');
pauseVideo.addEventListener('click', function() {
  if (video.paused)
    video.play(); 
  else 
    video.pause(); 
}, true);
```

### 비디오 속도 조절하기
- index.html에 file 타입의 input tag를 만든다.
```
<button id="fast">Faster</button>
```

- 버튼을 클릭하는 것을 감지하여 비디오가 멈추어 있을 경우 재생하고, 비디오가 재생되는 중에는 멈추도록 한다.
- document.getElementById('speed').innerHTML을 통해 현재 재생속도를 HTML 화면에 보이도록 한다.
```
fastVideo.addEventListener('click', function() {
  video.playbackRate *= 2;
  document.getElementById('speed').innerHTML = video.playbackRate;
}, true);
```

# 참고한 코드
- 이 코드는 https://developer.mozilla.org/ko/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL 의 예제 코드를 바탕으로 코드를, 수정/추가 하여 만들었습니다.
- 참고한 코드는 CC0 라이센스로 저작물에 대한 변형, 저작권자와 상의 없이 재배포가 가능하며, 출처 표시의 의무가 없습니다.