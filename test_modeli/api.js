const app = require("express")();
const bodyParser = require("body-parser");
const tf = require("@tensorflow/tfjs-node");

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/aa", async (req, res) => {
    try {
        const formData = req.body;
        const boyDegeri = parseFloat(formData.boy);

        if (isNaN(boyDegeri)) {
            return res.json({
                message: "Geçersiz boy değeri gönderildi.",
                data: null
            });
        }

        const model = await tf.loadLayersModel('file://./kilo-model/model.json');

        const boyTest = tf.tensor2d([boyDegeri], [1, 1]);

        const tahmin = model.predict(boyTest);

        const tahminDeğeri = tahmin.dataSync()[0];

        if (isNaN(tahminDeğeri)) {
            return res.status(500).json({
                message: "Tahmin işlemi başarısız. Model çıktısı geçersiz.",
                data: null
            });
        }

        console.log(`${boyDegeri} metre için tahmini kilo: ${tahminDeğeri.toFixed(2)} kg`);

        res.json({
            message: "Veri alındı",
            data: tahminDeğeri.toFixed(2)
        });

    } catch (error) {
        console.error("Hata:", error.message);
        res.status(500).json({
            message: "Sunucuda bir hata oluştu.",
            data: null
        });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
