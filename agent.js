class Agent{
    constructor(headSize, x, y){
        this.headSize = headSize;
        this.pos = createVector(x, y);
    }


    draw(params) {
        // Posicao central do personagem
        let x = width / 2;
        let y = height / 2;

        // Tamanho da cabeca


            
        // Desenha a cabeca
        fill(0, 255, 0); // Cor da cabeca (rosa claro)
        stroke(255, 255, 255);
        strokeWeight(2);
        ellipse(x, y, this.headSize, this.headSize);

    }
    
}
    