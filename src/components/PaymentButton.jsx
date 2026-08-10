import axios from "axios";

function PaymentButton() {

    const payDeposit = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/payments/deposit",
                {
                    customerName: "Samuel",
                    customerEmail: "samuel@email.com",
                    amount: 100
                }
            );

            window.location.href =
                response.data.paymentUrl;

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <button onClick={payDeposit}>
            Pay Deposit (R100)
        </button>
    );
}

export default PaymentButton;