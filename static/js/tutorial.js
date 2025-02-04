const steps = [
    "Na stanowisku Tester-Programista twoim głównym zadaniem będzie znajdowanie i zgłaszanie błędów w oprogramowaniu.",
    "W grze będziesz zbierać 'błędy' i raportować je, omijając różne przeszkody. Musisz być szybki i precyzyjny!",
    "Z czasem nauczysz się automatyzować testy, co przyspieszy twoją pracę. W grze również z tego skorzystasz.",
    "Pamiętaj o współpracy z zespołem. Komunikacja jest kluczowa dla sukcesu testera oprogramowania.",
    "Gotowy? Kliknij 'Dalej', aby zacząć swoją przygodę jako Tester-Programista!"
];

let currentStep = 0;
const stepText = document.getElementById('step-text');
const nextStepBtn = document.getElementById('next-step-btn');

nextStepBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        stepText.innerHTML = steps[currentStep];
    } else {
        // Przejście do faktycznej gry
        window.location.href = "/gra";  // Możemy dodać ścieżkę do faktycznego poziomu gry.
    }
});
