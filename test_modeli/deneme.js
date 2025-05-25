const tf = require('@tensorflow/tfjs-node');

async function run() {
    // Eğitim verisi: Boy (m), Kilo (kg)
    const boyArray = [1.50, 1.60, 1.70, 1.80, 1.90];
    const kiloArray = boyArray.map(boy => 25 * boy * boy);
    const boyTrain = tf.tensor2d(boyArray, [5, 1]);
    const kiloTrain = tf.tensor2d(kiloArray, [5, 1]);


    // Test verisi
    const boyTest = tf.tensor2d([1.90], [1, 1]);
    const kiloTest = tf.tensor2d([80], [1, 1]);

    // Model oluştur
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    model.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd'
    });

    // Eğit
    const history = await model.fit(boyTrain, kiloTrain, {epochs: 500});

    console.log('Model eğitildi!');
    console.log(`Son epoch kaybı (loss): ${history.history.loss[history.history.loss.length - 1].toFixed(4)}`);

    // Test verisiyle değerlendir
    const evalResult = model.evaluate(boyTest, kiloTest);
    const testLoss = (await evalResult.data())[0];
    console.log(`Test kaybı (loss): ${testLoss.toFixed(4)}`);

    // Tahmin yap
    const boyTahmin = tf.tensor2d([1.75], [1, 1]);
    const tahmin = model.predict(boyTahmin);
    tahmin.print();

    // Modeli kaydet
    await model.save('file://./kilo-model');
}

run();
