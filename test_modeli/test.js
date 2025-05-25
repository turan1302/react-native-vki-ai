const tf = require('@tensorflow/tfjs-node');

async function test() {
    // Daha önce kaydettiğin modeli yükle
    const model = await tf.loadLayersModel('file://./kilo-model/model.json');

    // Test için yeni boy verisi (örneğin 1.75 metre)
    const boyTest = tf.tensor2d([1.55], [1, 1]);

    // Tahmin yap
    const tahmin = model.predict(boyTest);

    // Tahmin sonucunu yazdır (tensor)
    tahmin.print();

    // Dilersen değeri JS değişkeni olarak al
    const tahminDeğeri = tahmin.dataSync()[0];
    console.log(`1.55 metre için tahmini kilo: ${tahminDeğeri.toFixed(2)} kg`);
}

test();
