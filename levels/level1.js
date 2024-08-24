let level1;

function initLevel() {
    let bottles = [];
    let coins = [];
    let enemies = [];
    // let enemyTypes = [new Chicken, new SmallChicken];

    for (let i = 0; i < 10; i++) {
        let bottle = new Bottle(bottles);
        bottles.push(bottle);
    }

    for (let i = 0; i < 20; i++) {
        let coin = new Coin(coins);
        coins.push(coin);
    }

    for (let i = 0; i < Math.round(5 + Math.random() + 2); i++) {
        let enemy = new Chicken(enemies);
        enemies.push(enemy);
    }

    for (let i = 0; i < Math.round(5 + Math.random() + 2); i++) {
        let enemy = new SmallChicken(enemies);
        enemies.push(enemy);
    }

    level1 = new Level(
        /*[
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
        ],*/
        enemies,
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
            
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('./img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 4),
            new BackgroundObject('./img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 5)
        ],
        bottles,
        coins
    );
}