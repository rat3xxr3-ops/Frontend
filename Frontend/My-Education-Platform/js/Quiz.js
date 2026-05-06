function checkQuiz() {
    const answer = document.querySelector('input[name="q1"]:checked').value;
    if (answer === "correct") {
        alert("إجابة صحيحة! مبروك حصلت على الشهادة.");
        generateCertificate();
    } else {
        alert("حاول مرة أخرى!");
    }
}

function generateCertificate() {
    const certWindow = window.open("", "الشهادة", "width=800,height=600");
    certWindow.document.write(`
        <div style="text-align:center; border:10px double #gold; padding:50px; font-family:Cairo">
            <h1>شهادة إتمام كورس</h1>
            <p>نقر بأن الطالب: <b>${currentUser.name}</b> قد أتم بنجاح كورس البرمجة.</p>
            <p>التاريخ: ${new Date().toLocaleDateString()}</p>
        </div>
    `);
}