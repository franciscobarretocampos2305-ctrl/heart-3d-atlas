export type Marcador = {
  ponto: [number, number, number];
  direcao: [number, number, number];
  distancia: number;
};

export type Parte = {
  id: string;
  nome: string;
  categoria: string;
  marcador?: Marcador;
  resumo: string;
  funcao: string;
  estrutura: string;
  saude: string;
  curiosidade: string;
};

// ordem = caminho do sangue
export const PARTES: Parte[] = [
  {
    id: "geral",
    nome: "Coração humano",
    categoria: "Visão geral",
    resumo:
      "Órgão muscular oco, do tamanho aproximado de um punho fechado. Fica no centro do tórax, entre os pulmões e atrás do esterno, com a ponta voltada para a esquerda. Pesa entre 250 e 350 gramas no adulto.",
    funcao:
      "Funciona como duas bombas lado a lado: o lado direito envia sangue pobre em oxigênio aos pulmões, e o lado esquerdo envia sangue oxigenado ao corpo inteiro.",
    estrutura:
      "Tem quatro câmaras: dois átrios em cima, que recebem o sangue, e dois ventrículos embaixo, que o bombeiam. Quatro valvas fazem o sangue correr num só sentido, e um septo separa o lado direito do esquerdo para que os dois tipos de sangue não se misturem. Este modelo está cortado ao meio para mostrar o interior.",
    saude:
      "As doenças cardiovasculares, como o infarto e o AVC, são a principal causa de morte no mundo. Pressão alta, colesterol elevado, tabagismo, diabetes e sedentarismo são os principais fatores de risco.",
    curiosidade:
      "Bate cerca de 100 mil vezes por dia e bombeia algo em torno de 7 mil litros de sangue nesse período.",
  },
  {
    id: "camadas",
    marcador: { ponto: [0.441, -0.985, 0.787], direcao: [0, 0.174, 0.985], distancia: 1.2 },
    nome: "Parede do coração",
    categoria: "Estrutura",
    resumo:
      "A parede do coração tem três camadas: o endocárdio por dentro, o miocárdio no meio e o epicárdio por fora. Tudo fica envolvido pelo pericárdio, um saco de membrana dupla. Aqui dá para ver o miocárdio na superfície cortada.",
    funcao:
      "O miocárdio é o músculo que contrai e faz o coração bombear. O endocárdio forra as câmaras e as valvas e deixa a superfície lisa para o sangue correr. O pericárdio protege o coração, prende ele no lugar e, com uma fina camada de líquido, reduz o atrito a cada batimento.",
    estrutura:
      "O músculo cardíaco é estriado como o dos braços e pernas, mas é involuntário. Suas células são ramificadas e unidas por discos intercalares, que deixam o impulso elétrico passar de uma célula para outra e fazem o músculo contrair em conjunto.",
    saude:
      "Pericardite é a inflamação do pericárdio e costuma causar dor no peito que piora ao deitar. Miocardite é a inflamação do próprio músculo, muitas vezes causada por vírus.",
    curiosidade:
      "As células do músculo cardíaco quase não se renovam: num adulto jovem, cerca de 1% delas é substituído por ano, e na velhice menos da metade disso.",
  },
  {
    id: "veias-cavas",
    marcador: { ponto: [-0.492, 0.791, -0.188], direcao: [-0.837, 0.171, 0.521], distancia: 1.5 },
    nome: "Veias cavas",
    categoria: "Grandes vasos",
    resumo:
      "Duas grandes veias: a cava superior traz o sangue da cabeça, do pescoço e dos braços; a inferior traz o do abdome e das pernas.",
    funcao:
      "Devolvem o sangue pobre em oxigênio ao átrio direito, fechando o circuito que percorreu o corpo.",
    estrutura:
      "Têm paredes mais finas que as das artérias. A cava superior se forma pela união das veias braquiocefálicas, e a inferior sobe pelo abdome ao lado da aorta e atravessa o diafragma até chegar ao coração.",
    saude:
      "No fim da gravidez, deitar de barriga para cima pode fazer o útero comprimir a veia cava inferior, reduzindo a volta do sangue e causando tontura e queda de pressão. Por isso se recomenda deitar de lado.",
    curiosidade: "A veia cava inferior é a maior veia do corpo humano.",
  },
  {
    id: "atrio-direito",
    marcador: { ponto: [-0.545, -0.034, -0.311], direcao: [0, 0.174, 0.985], distancia: 1.4 },
    nome: "Átrio direito",
    categoria: "Câmaras",
    resumo:
      "Câmara superior direita. Recebe o sangue venoso que volta do corpo pelas veias cavas e do próprio coração pelo seio coronário.",
    funcao:
      "Atua como reservatório e, ao contrair, completa o enchimento do ventrículo direito através da valva tricúspide.",
    estrutura:
      "Tem paredes finas. Na parede que o separa do átrio esquerdo há uma depressão oval, a fossa oval: é a marca do forame oval, uma passagem que no feto desvia o sangue dos pulmões, que ainda não respiram.",
    saude:
      "Em cerca de 1 a cada 4 pessoas o forame oval não se fecha por completo (forame oval patente). Na grande maioria dos casos isso não causa nenhum problema.",
    curiosidade:
      "Na sua parede fica o nó sinoatrial, o marca-passo natural que dispara cada batimento.",
  },
  {
    id: "sistema-conducao",
    marcador: { ponto: [-0.438, 0.373, -0.07], direcao: [0, 0.174, 0.985], distancia: 1.2 },
    nome: "Sistema de condução elétrica",
    categoria: "Ritmo",
    resumo:
      "Rede de células especializadas que gera e conduz os impulsos elétricos do coração. Essas células não se distinguem a olho nu; o marcador mostra onde fica o nó sinoatrial, no alto do átrio direito, perto da entrada da veia cava superior.",
    funcao:
      "O nó sinoatrial dispara o impulso, que se espalha pelos átrios e os faz contrair. O nó atrioventricular segura o impulso por uma fração de segundo, para os ventrículos terminarem de encher, e depois o passa adiante até os ventrículos, que contraem de baixo para cima e empurram o sangue para as artérias.",
    estrutura:
      "O caminho é: nó sinoatrial → átrios → nó atrioventricular → feixe de His, que se divide em ramos direito e esquerdo ao longo do septo → fibras de Purkinje, espalhadas pelas paredes dos ventrículos.",
    saude:
      "Falhas nesse sistema causam arritmias, como a fibrilação atrial e os bloqueios. Quando o ritmo fica lento demais, pode ser preciso implantar um marca-passo artificial. O eletrocardiograma (ECG) registra justamente essa atividade elétrica.",
    curiosidade:
      "O coração gera os próprios impulsos: mesmo sem ligação com os nervos, como depois de um transplante, ele continua batendo. Os nervos só aceleram ou desaceleram o ritmo.",
  },
  {
    id: "valva-tricuspide",
    marcador: { ponto: [-0.306, -0.385, 0.408], direcao: [0, 0.174, 0.985], distancia: 1.1 },
    nome: "Valva tricúspide",
    categoria: "Valvas",
    resumo: "Valva entre o átrio e o ventrículo direitos, formada por três folhetos (cúspides).",
    funcao:
      "Abre para o sangue descer ao ventrículo e fecha quando ele contrai, impedindo o refluxo para o átrio.",
    estrutura:
      "Três folhetos finos (anterior, posterior e septal) presos a um anel fibroso. Das bordas dos folhetos saem as cordas tendíneas, que se ligam aos músculos papilares na parede do ventrículo direito.",
    saude:
      "Na insuficiência tricúspide a valva não fecha bem e o sangue volta para o átrio. Costuma aparecer quando o ventrículo direito se dilata, por exemplo na hipertensão pulmonar.",
    curiosidade:
      "O fechamento das valvas tricúspide e mitral produz a primeira bulha cardíaca, o “tum” do batimento.",
  },
  {
    id: "ventriculo-direito",
    marcador: { ponto: [-0.197, -0.719, 0.625], direcao: [0, 0.174, 0.985], distancia: 1.5 },
    nome: "Ventrículo direito",
    categoria: "Câmaras",
    resumo:
      "Câmara inferior direita, de parede mais fina que a do esquerdo e com formato de meia-lua quando vista em corte.",
    funcao:
      "Bombeia o sangue venoso para os pulmões pelo tronco pulmonar, onde ele troca gás carbônico por oxigênio.",
    estrutura:
      "Sua parede interna é cheia de traves musculares, as trabéculas cárneas. Uma delas, a trabécula septomarginal, cruza a cavidade levando parte do sistema de condução até o músculo papilar anterior.",
    saude:
      "Doenças dos pulmões e a hipertensão pulmonar obrigam o ventrículo direito a fazer mais força. Com o tempo ele dilata e pode falhar, o que se chama cor pulmonale.",
    curiosidade:
      "Trabalha num circuito de baixa pressão: gera cerca de 5 vezes menos pressão que o ventrículo esquerdo.",
  },
  {
    id: "valva-pulmonar",
    marcador: { ponto: [-0.015, 0.204, 0.416], direcao: [0, 0.174, 0.985], distancia: 1.0 },
    nome: "Valva pulmonar",
    categoria: "Valvas",
    resumo: "Valva semilunar de três cúspides na saída do ventrículo direito.",
    funcao: "Impede que o sangue volte do tronco pulmonar para o ventrículo quando ele relaxa.",
    estrutura:
      "Três cúspides em forma de bolso, sem cordas tendíneas. Elas se fecham sozinhas quando o sangue tenta voltar e enche os bolsos.",
    saude:
      "A estenose pulmonar (valva estreitada) costuma ser de nascença. Hoje muitas vezes é tratada com um balão levado por cateter, sem abrir o peito.",
    curiosidade:
      "O fechamento das valvas pulmonar e aórtica produz a segunda bulha, o “tá” do batimento. Na inspiração a pulmonar fecha um pouco depois da aórtica, e o médico às vezes ouve esse som desdobrado no estetoscópio.",
  },
  {
    id: "tronco-pulmonar",
    marcador: { ponto: [0.114, 0.535, 0.162], direcao: [0, 0.174, 0.985], distancia: 1.4 },
    nome: "Tronco pulmonar",
    categoria: "Grandes vasos",
    resumo:
      "Grande vaso que sai do ventrículo direito e se divide nas artérias pulmonares direita e esquerda.",
    funcao: "Leva o sangue pobre em oxigênio até os pulmões.",
    estrutura:
      "Tem cerca de 5 cm de comprimento e se divide logo abaixo do arco da aorta. Entre ele e a aorta fica o ligamento arterioso, o que sobrou do canal arterial, um desvio de sangue que existe no feto.",
    saude:
      "Na embolia pulmonar, um coágulo, quase sempre vindo das veias das pernas, entope as artérias pulmonares. É uma emergência médica.",
    curiosidade:
      "É uma das poucas artérias que carregam sangue pobre em oxigênio. Artéria é definida pela direção (sai do coração), não pelo tipo de sangue.",
  },
  {
    id: "veias-pulmonares",
    marcador: { ponto: [-0.524, -0.035, -0.604], direcao: [-0.621, 0.383, -0.684], distancia: 1.4 },
    nome: "Veias pulmonares",
    categoria: "Grandes vasos",
    resumo:
      "Normalmente são quatro veias, duas de cada pulmão, que desembocam na parte de trás do átrio esquerdo.",
    funcao: "Trazem de volta ao coração o sangue recém-oxigenado nos pulmões.",
    estrutura:
      "Cada pulmão costuma ter uma veia superior e uma inferior, mas variações são comuns, como três veias de um lado ou duas veias que se juntam antes de chegar ao átrio.",
    saude:
      "É na entrada das veias pulmonares que muitas vezes começam os impulsos elétricos anormais da fibrilação atrial. Um tratamento comum é a ablação, que cria pequenas cicatrizes para isolar essas veias.",
    curiosidade: "São as únicas veias do adulto que carregam sangue rico em oxigênio.",
  },
  {
    id: "atrio-esquerdo",
    marcador: { ponto: [0.465, 0.12, -0.349], direcao: [0, 0.174, 0.985], distancia: 1.3 },
    nome: "Átrio esquerdo",
    categoria: "Câmaras",
    resumo: "Câmara superior esquerda e a mais posterior do coração.",
    funcao:
      "Recebe o sangue oxigenado das veias pulmonares e o passa ao ventrículo esquerdo pela valva mitral.",
    estrutura:
      "Tem paredes lisas e fica logo à frente do esôfago. Por isso o ecocardiograma transesofágico, feito com uma sonda pela garganta, consegue mostrá-lo com muito detalhe.",
    saude:
      "Quando a valva mitral estreita ou vaza, o átrio esquerdo trabalha sob pressão e dilata, o que favorece a fibrilação atrial.",
    curiosidade:
      "Sua aurícula, um pequeno apêndice em forma de orelha, é onde mais se formam coágulos na fibrilação atrial. Se um deles se solta, pode chegar ao cérebro e causar um AVC.",
  },
  {
    id: "valva-mitral",
    marcador: { ponto: [0.359, -0.087, 0.023], direcao: [0.785, 0.338, 0.52], distancia: 1.1 },
    nome: "Valva mitral",
    categoria: "Valvas",
    resumo: "Valva entre o átrio e o ventrículo esquerdos, com dois folhetos.",
    funcao:
      "Deixa o sangue oxigenado entrar no ventrículo esquerdo e fecha na contração para que ele não volte aos pulmões.",
    estrutura:
      "Dois folhetos, anterior e posterior, presos por cordas tendíneas a dois músculos papilares. É a única valva do coração com apenas dois folhetos, por isso também se chama bicúspide.",
    saude:
      "O prolapso mitral, quando um folheto se curva para dentro do átrio ao fechar, é a alteração valvar mais comum e geralmente não traz problemas. A febre reumática, ainda frequente no Brasil, é uma causa importante de estreitamento da mitral.",
    curiosidade:
      "O nome vem da mitra, o chapéu de bispo, por causa do formato dos seus dois folhetos.",
  },
  {
    id: "musculos-papilares",
    marcador: { ponto: [0.388, -0.5, 0.201], direcao: [0, 0.174, 0.985], distancia: 1.1 },
    nome: "Músculos papilares e cordas tendíneas",
    categoria: "Valvas",
    resumo:
      "Músculos em forma de cone que se projetam da parede dos ventrículos. Das suas pontas saem as cordas tendíneas, fios fibrosos presos às bordas das valvas tricúspide e mitral.",
    funcao:
      "Contraem junto com o ventrículo e esticam as cordas tendíneas, impedindo que os folhetos virem para dentro dos átrios com a pressão. Funcionam como os cabos que seguram um paraquedas.",
    estrutura:
      "O ventrículo esquerdo tem dois músculos papilares grandes; o direito costuma ter três, um deles bem pequeno. Neste modelo, as cordas da valva mitral aparecem como fios claros descendo até a parede.",
    saude:
      "Num infarto, um músculo papilar pode se romper. A valva mitral passa a vazar de repente, o que é uma emergência grave.",
    curiosidade:
      "A valva mitral é sustentada por cerca de 25 cordas tendíneas principais, que se ramificam antes de chegar aos folhetos.",
  },
  {
    id: "ventriculo-esquerdo",
    marcador: { ponto: [0.52, -0.7, 0.545], direcao: [0, 0.174, 0.985], distancia: 1.6 },
    nome: "Ventrículo esquerdo",
    categoria: "Câmaras",
    resumo:
      "Câmara inferior esquerda e a mais musculosa do coração. Forma a ponta do órgão, o ápice.",
    funcao: "Bombeia o sangue oxigenado para a aorta e, por ela, para o corpo inteiro.",
    estrutura:
      "Tem forma de cone e parede com cerca de 1 cm de espessura, perto do triplo da do ventrículo direito. O ápice é a parte que se sente batendo no peito, no quinto espaço entre as costelas, à esquerda.",
    saude:
      "A pressão alta obriga o ventrículo esquerdo a fazer mais força, e a parede engrossa (hipertrofia). Quando ele perde a capacidade de bombear bem, ocorre a insuficiência cardíaca.",
    curiosidade:
      "A cada batimento ele ejeta cerca de 70 ml de sangue, o que dá uns 5 litros por minuto em repouso.",
  },
  {
    id: "septo-interventricular",
    marcador: { ponto: [0.122, -0.517, 0.564], direcao: [0, 0.174, 0.985], distancia: 1.3 },
    nome: "Septo interventricular",
    categoria: "Estrutura",
    resumo:
      "Parede que separa o ventrículo direito do esquerdo. É quase toda muscular, com uma pequena parte fina e membranosa no alto, perto da valva aórtica.",
    funcao:
      "Impede que o sangue pobre e o rico em oxigênio se misturem e contrai junto com os ventrículos, ajudando a bombear. Por dentro dele descem os ramos do feixe de His, que levam o impulso elétrico aos ventrículos.",
    estrutura:
      "Tem espessura parecida com a da parede do ventrículo esquerdo e se curva em direção ao ventrículo direito, dando a este o formato de meia-lua.",
    saude:
      "A comunicação interventricular, um buraco no septo, é uma das malformações cardíacas de nascença mais comuns. Os buracos pequenos muitas vezes se fecham sozinhos na infância.",
    curiosidade:
      "É irrigado principalmente pelos ramos septais da artéria interventricular anterior, um ramo da coronária esquerda.",
  },
  {
    id: "valva-aortica",
    marcador: { ponto: [0.121, -0.06, 0.13], direcao: [0.785, 0.338, 0.52], distancia: 1.0 },
    nome: "Valva aórtica",
    categoria: "Valvas",
    resumo: "Valva semilunar de três cúspides na saída do ventrículo esquerdo.",
    funcao: "Abre para o sangue seguir à aorta e fecha para impedir o refluxo ao ventrículo.",
    estrutura:
      "Suas cúspides são mais grossas que as da valva pulmonar, porque suportam a maior pressão do coração. Atrás de cada uma há uma pequena dilatação da aorta, os seios aórticos.",
    saude:
      "A estenose aórtica, o endurecimento da valva por depósito de cálcio, é comum em idosos e hoje pode ser tratada com uma valva nova implantada por cateter (TAVI). Cerca de 1 a 2% das pessoas nascem com a valva bicúspide, com só duas cúspides.",
    curiosidade:
      "Logo acima dela, nos seios aórticos, nascem as artérias coronárias, que irrigam o próprio coração.",
  },
  {
    id: "aorta",
    marcador: { ponto: [-0.026, 0.831, -0.072], direcao: [0, 0.174, 0.985], distancia: 1.7 },
    nome: "Aorta",
    categoria: "Grandes vasos",
    resumo:
      "A maior artéria do corpo, com 2,5 a 3 cm de diâmetro na saída do coração. Sobe, faz um arco e desce pelo tórax e pelo abdome.",
    funcao:
      "Distribui o sangue oxigenado para todos os órgãos. Do seu arco saem os ramos para a cabeça e os braços.",
    estrutura:
      "Dividida em aorta ascendente, arco aórtico e aorta descendente (torácica e depois abdominal). Do arco saem três ramos: o tronco braquiocefálico, a artéria carótida comum esquerda e a artéria subclávia esquerda.",
    saude:
      "O aneurisma é uma dilatação da parede da aorta que pode se romper. Na dissecção, o sangue abre caminho entre as camadas da parede e causa dor intensa no peito ou nas costas. As duas são emergências.",
    curiosidade:
      "Suas paredes elásticas se distendem a cada batimento e se recolhem depois, mantendo o sangue em movimento enquanto o coração relaxa.",
  },
  {
    id: "coronarias",
    marcador: { ponto: [-0.291, -0.799, 0.098], direcao: [-0.766, -0.633, -0.112], distancia: 1.6 },
    nome: "Artérias coronárias",
    categoria: "Circulação do coração",
    resumo:
      "Duas artérias, direita e esquerda, que nascem na base da aorta e correm pela superfície do coração como uma coroa, daí o nome.",
    funcao:
      "Irrigam o próprio músculo cardíaco, que precisa de oxigênio o tempo todo para bater. O coração usa cerca de 5% de todo o sangue que bombeia.",
    estrutura:
      "A coronária esquerda logo se divide em artéria interventricular anterior (a “descendente anterior”) e artéria circunflexa. A coronária direita corre pelo sulco entre o átrio e o ventrículo direitos e, na maioria das pessoas, também irriga os nós do sistema de condução.",
    saude:
      "Placas de gordura (aterosclerose) estreitam as coronárias e podem causar angina, dor no peito no esforço. Se uma placa se rompe e forma um coágulo, vem o infarto. O tratamento inclui angioplastia com stent e a cirurgia de ponte de safena.",
    curiosidade:
      "Ao contrário de quase todo o corpo, o ventrículo esquerdo recebe sangue principalmente quando o coração relaxa, porque na contração o próprio músculo aperta os seus vasos.",
  },
  {
    id: "veias-cardiacas",
    marcador: { ponto: [-0.038, -0.869, 0.13], direcao: [-0.766, -0.633, -0.112], distancia: 1.5 },
    nome: "Veias cardíacas e seio coronário",
    categoria: "Circulação do coração",
    resumo:
      "Rede de veias na superfície do coração que se juntam no seio coronário, um canal na face posterior.",
    funcao:
      "Recolhem o sangue já usado pelo músculo cardíaco e o devolvem ao átrio direito.",
    estrutura:
      "As principais são as veias cardíacas magna, média e parva, que desembocam no seio coronário. Algumas veias bem pequenas, as veias cardíacas mínimas, se abrem direto nas câmaras.",
    saude:
      "O seio coronário serve de caminho para cateteres: na terapia de ressincronização, um eletrodo de marca-passo é levado por ele até a parede do ventrículo esquerdo.",
    curiosidade:
      "A veia cardíaca magna acompanha a artéria interventricular anterior, um dos ramos coronários mais importantes.",
  },
];
