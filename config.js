export const pages = {
    "Manejo da hidratação": {
        type: "Ação",
        title: "1 - Manejo da hidratação",
        instruction: "Administre NaCl 0,9% (SF) 1 - 1,5L (15 a 20ml/Kg) na 1ª hora",
        extraInstruction: "Na ausência de disfunção cardíaca e renal",
        next: "Estado da hidratação"
    },
    "Estado da hidratação": {
        type: "Estado",
        title: "Estado da hidratação",
        choices: [
            "Desidratação leve a moderada",
            "Desidratação grave",
            "Choque hipovolêmico"
        ],
        next: {
            "Desidratação leve a moderada": "Calculadora de sódio corrigido",
            "Desidratação grave": "Desidratação grave",
            "Choque hipovolêmico": "Choque hipovolêmico"
        }
    },
    "Calculadora de sódio corrigido": {
        type: "Calculadora",
        title: "Calculadora de sódio corrigido",
        inputs: ["Sódio medido", "Glicose sérica"],
        calculate: (sodio, glicose) => sodio + 0.016 * (glicose - 100),
        next: (result) => result < 135 ? "Sódio corrigido menor" : "Sódio corrigido maior"
    },
    "Desidratação grave": {
        type: "Ação",
        title: "Desidratação grave",
        instruction: "Administre NaCl 0,9% 1L/h até estabilização",
        next: "Calculadora de sódio corrigido"
    },
    "Choque hipovolêmico": {
        type: "Ação",
        title: "Choque hipovolêmico",
        instruction: "Administre NaCl 0,9% 1L/h até estabilização",
        extraInstruction: "Considerar drogas vasoativas",
        next: "Calculadora de sódio corrigido"
    },
    "Sódio corrigido menor": {
        type: "Ação",
        title: "Sódio corrigido < 135mEq/L",
        instruction: "Administre NaCl 0,9% 250-500ml/h",
        next: "Estado do potássio"
    },
    "Sódio corrigido maior": {
        type: "Ação",
        title: "Sódio corrigido > 135mEq/L",
        instruction: "Administre NaCl 0,45% 250-500ml/h",
        next: "Estado do potássio"
    },
    "Estado do potássio": {
        type: "Estado",
        title: "2 - Reposição de potássio",
        choices: ["K < 3,3mEq/L", "K de 3,3 a 5,2mEq/L", "K > 5,2mEq/L"],
        next: {
            "K < 3,3mEq/L": "Potássio menor",
            "K de 3,3 a 5,2mEq/L": "Potássio entre", 
            "K > 5,2mEq/L": "Potássio maior"
        }
    },
    "Potássio menor": {
        type: "Ação",
        title: "K+ < 3,3mEq/L",
        instruction: "Infundir 0,8 a 1,2ml da ampola de KCl 19,1% (10-30mEq) a cada 1L de NaCl 0,9% (SF) durante 1h até K+ > 3,3mEq/L. Lembrete: Uma ampola (10ml) KCl 19,1% = 25mEq",
        extraInstruction: "Verificar potássio a cada 2h",
        next: "Estado do bicarbonato"
    },
    "Potássio entre": {
        type: "Ação",
        title: "K+ de 3,3 a 5,2mEq/L",
        instruction: "Infundir 0,4 a 0,8ml da ampola de KCl 19,1% (10-20mEq) a cada 1L de NaCl 0,9% (SF) para manter K+ entre 4 e 5mEq/L. Lembrete: Uma ampola (10ml) KCl 19,1% = 25mEq", 
        next: "Estado do bicarbonato"
    },
    "Potássio maior": {
        type: "Ação",
        title: "K+ > 5,2mEq/L",
        instruction: "Verificar potássio a cada 2h.",
        extraInstruction: "Não administrar K+",
        next: "Estado do bicarbonato"
    },
    "Estado do bicarbonato": {
        type: "Estado",
        title: "3 - Estado do bicarbonato",
        choices: ["pH < 6,9", "pH > 6,9"],
        next: {
            "pH < 6,9": "PH menor",
            "pH > 6,9": "PH maior"
        }
    },
    "PH menor": {
        type: "Ação",
        title: "pH < 6,9", 
        instruction: "Infundir 50-100ml de NaHCO3 8,4% em 200-400ml de água destilada em 2 horas.",
        extraInstruction: "Verificar bicarbonato a cada 2 horas até pH > 6,9",
        next: "Insulinoterapia"
    },
    "PH maior": {
        type: "Ação",
        title: "pH > 6,9",
        instruction: " ",
        extraInstruction: "Não repor bicarbonato",
        next: "Insulinoterapia"
    },
    "Insulinoterapia": {
        type: "Ação",
        title: "4 - Insulinoterapia",
        instruction: "Administrar insulina regular em bomba de infusão continua IV 0,1ui/Kg/h. (Opcional: bolus 0,1ui/Kg IV antes de iniciar a infusão continua). Sugestão de diluição: 25ui de insulina para 250ml de SF 0,9% = 0,1ui/ml. Infundir 1ml/Kg/h",
        extraInstruction: "Esse é o último passo desse aplicativo, o botão de próximo irá reiniciar o passo a passo.",
        next: "Manejo da hidratação"
    }
};

export const initialState = "Manejo da hidratação";