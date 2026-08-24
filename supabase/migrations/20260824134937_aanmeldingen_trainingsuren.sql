-- Aantal afgeronde trainingsuren van de yogaopleiding (aanmeldformulier docenten, sectie "Opleiding & ervaring")
-- Minimumeis voor toelating is 200 uur, vandaar geen optie daaronder.
ALTER TABLE aanmeldingen
  ADD COLUMN trainingsuren TEXT CHECK (trainingsuren IN ('200 uur', '400 uur', 'Meer dan 400 uur'));
