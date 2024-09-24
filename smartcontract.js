async function confirmTransaction() {
    if (typeof window.aptos === 'undefined') {
        alert("Please install the Petra wallet extension.");
        return;
    }

    try {
        // Connect to the wallet
        const wallet = await window.aptos.connect();
        console.log("Wallet connected:", wallet);

        // Define the transaction payload for the smart contract
        const payload = {
            type: "entry_function_payload",
            function: "0x9557e7609cf6e3a3a14d6f7a40f6e3451608af1c7f271a321c2eda8b9b77fac8::Confirmations::confirm_transaction",
            arguments: [],
            type_arguments: []
        };


        // Sign and submit the transaction
        const transaction = await window.aptos.signAndSubmitTransaction(payload);
        console.log("Transaction submitted, hash:", transaction.hash);

        // Wait for confirmation
        const response = await window.aptos.waitForTransaction(transaction.hash);
        console.log("Transaction confirmed:", response);

        // Once confirmed, mark the checkbox and disable it
        document.getElementById('confirm-data').checked = true;
        document.getElementById('confirm-data').disabled = true;
        alert("Transaction confirmed and checkbox updated!");

    } catch (error) {
        console.error("Error during transaction:", error);
    }
}

// Event listener for checkbox
document.getElementById('confirm-data').addEventListener('change', (event) => {
    if (event.target.checked) {
        confirmTransaction();
    }
});