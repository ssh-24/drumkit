;(function () {
  'use strict'

  const get = function (target) {
    return document.querySelector(target)
  }

  const getAll = function (target) {
    return document.querySelectorAll(target)
  }

  const soundsRoot = 'assets/sounds/'
  // 각 키보드의 고유 번호를 sound와 매핑
  const drumSounds = [
    { key: 81, sound: 'clap.wav' },
    { key: 87, sound: 'crash.wav' },
    { key: 69, sound: 'hihat.wav' },
    { key: 65, sound: 'kick.wav' },
    { key: 83, sound: 'openhat.wav' },
    { key: 68, sound: 'ride.wav' },
    { key: 90, sound: 'shaker.wav' },
    { key: 88, sound: 'snare.wav' },
    { key: 67, sound: 'tom.wav' },
  ]


  const key_nodeList = getAll('.key') // NodeList(유사배열객체), 배열로 변경 필요
  const key_array = Array.from(key_nodeList);


  const getAudioElement = (index) => {
    const audio = document.createElement('audio');
    audio.dataset.key = drumSounds[index].key // drumSounds의 key값으로 audio Element의 data-key 설정
    audio.src = soundsRoot + drumSounds[index].sound // 경로 + sound
    return audio; // Element 반환
  }


  const playSound = (keycode) => {
    const $audio = get(`audio[data-key="${keycode}"]`)
    const $key = get(`div[data-key="${keycode}"]`) // for 애니메이션
    // key와 audio가 존재하면 실행
    if ($key && $audio) {
      $key.classList.add('playing') // 클래스 추가해서 애니메이션 효과 추가
      $audio.currentTime = 0
      $audio.play()
    }
  }


  // 키보드 이벤트
  const onKeyDown = (e) => {
    // console.log(e.keyCode); // keyCode로 고유값 알아낼 수 있음
    playSound(e.keyCode); // 입력된 key의 고유값 넘겨줌
  }


  // 마우스 클릭 이벤트
  const onMouseDown = (e) => {
    const keycode = e.target.getAttribute('data-key')
    playSound(keycode);
  }


  // playSound에서 class 추가하여 변경시킨 항목을 원래대로 
  const onTransitionEnd = (e) => {
    // 속성이 transform 일 때 실행
    if (e.propertyName === 'transform') {
      e.target.classList.remove('playing')
    }
  }


  const init = () => {
    window.addEventListener('keydown', onKeyDown)
    key_array.forEach((key,index) => {
      const audio = getAudioElement(index);
      key.appendChild(audio);
      key.dataset.key = drumSounds[index].key
      key.addEventListener('click', onMouseDown)
      key.addEventListener('transitionend', onTransitionEnd)
    })
  }


  init()
})()
