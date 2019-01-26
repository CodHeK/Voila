const SpeechToText = require('speech-to-text');

let recog_text = '';

const onAnythingSaid = text => {
    recog_text = text;
};

const onEndEvent = () => {
    startListening();
};

const onFinalised = text => {
  recog_text = text;
};

module.exports.stt = function() {
  try {
    const listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
    console.log(recog_text);
  } catch (error) {
    console.log(error);
  }
}
