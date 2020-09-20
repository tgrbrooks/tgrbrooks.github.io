importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.3.0/dist/tf.min.js");
importScripts("word2idx.js");

let idx2word = new Map(Array.from(word2idx, a => a.reverse()));

function str2Idx(str) {
  var words = str.split(' ');
  let result = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word2idx.has(word)){
      var idx = word2idx.get(word);
      result.push(idx);
    }
  }
  return tf.tensor1d(result);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function generateCover(txt) {
    // Load the model from the configuration file
    // NOTE: Cannot load a model with more than 6 shards in chrome!!
    const model = await tf.loadLayersModel('../models/word_model/model.json')

    // Get the starting text from the user input
    txt = "I am writing to apply for the role of "+txt;
    // Convert into numeric ids
    var seed = str2Idx(txt)
    seed = seed.expandDims(0)

    // Store the generated text in a list
    text_generated = []
    var temperature = 1.

    // Reset the internal state of the model
    model.resetStates()


    var capital = false;
    for (var i = 0; i < 200; i++) {
      // Predict the next character, returns probablity for each possible output
      var prediction = model.predict(seed)
      prediction = prediction.squeeze(0)
      prediction = prediction.div(temperature)

      // Choose next char randomly based on probability
      var predicted_id = tf.multinomial(prediction, 1)
      predicted_id = predicted_id.arraySync()
      predicted_id = predicted_id[predicted_id.length-1][0]

      // Set the seed as the predicted char
      seed = tf.tensor([predicted_id])
      seed = seed.expandDims(0)

      // Append to the generated text
      if(idx2word.get(predicted_id)=="."){
        postMessage(idx2word.get(predicted_id));
        capital = true;
      }
      else if(capital){
        postMessage(" "+capitalize(idx2word.get(predicted_id)));
        capital = false;
      }
      else if(idx2word.get(predicted_id)=="i"){
        postMessage(" I");
      }
      else{
        postMessage(" "+idx2word.get(predicted_id));
      }
    }
    postMessage("Yours Faithfully,");
    close();
}

onmessage = function(e) {
    generateCover(e.data);
};
