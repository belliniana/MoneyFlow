const amount =
    document.getElementById("amount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const convertBtn =
    document.getElementById("convertBtn");

const result =
    document.getElementById("result");

const loading =
    document.getElementById("loading");

const swapBtn =
    document.getElementById("swapBtn");

const historyList =
    document.getElementById("historyList");

let history =
    JSON.parse(
        localStorage.getItem(
            "currencyHistory"
        )
    ) || [];

function renderHistory() {

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

async function convertCurrency() {

    const value =
        Number(amount.value);

    if (!value) {

        alert(
            "Digite um valor."
        );

        return;
    }

    loading.style.display =
        "block";

    try {

        const response =
            await fetch(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
            );

        const data =
            await response.json();

        const rate =
            data.rates[
            toCurrency.value
            ];

        const converted =
            value * rate;

        result.textContent =
            converted.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency:
                        toCurrency.value
                });

        const registro =
            `${value} ${fromCurrency.value}
        → ${converted.toFixed(2)}
        ${toCurrency.value}`;

        history.unshift(
            registro
        );

        if (history.length > 10) {

            history.pop();

        }

        localStorage.setItem(
            "currencyHistory",
            JSON.stringify(history)
        );

        renderHistory();

    } catch (error) {

        alert(
            "Erro ao buscar cotação."
        );

    }

    loading.style.display =
        "none";

}

swapBtn.addEventListener(
    "click",
    () => {

        const temp =
            fromCurrency.value;

        fromCurrency.value =
            toCurrency.value;

        toCurrency.value =
            temp;

    });

convertBtn.addEventListener(
    "click",
    convertCurrency
);

renderHistory();