<?php
	require_once('php/config.php');
?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="http://code.jquery.com/ui/1.12.1/jquery-ui.js"integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30="crossorigin="anonymous"></script>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"></link>
	<script src="js/cart.js" type="text/javascript"></script>
	<style>
		* {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 18px;
			color: rgb(78, 78, 78);
			margin: 0;
		}
		body {
			margin-left: 20px;
		}
		a {
			text-decoration: none;
			margin-right: 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 120px;
			height: 40px;
			color: #fff;
			background-color: #007bff;
			border: 1px solid #007bff;
			border-radius: 5px;
		}
		a:hover {
			background: #4d9ff7;
            border-color: #4d9ff7;
		}
		a:active {
			background: #ffffff;
            color: #000;
            border-color: #007bff;
		}
		.btn {
			width: 500px;
			display: flex;
			justify-content: flex-start;
		}
		#cart{
			margin-top: 20px;
			width: 220px;
			border: 2px solid  #007bff;
			padding: 20px;
			padding-bottom: 30px;
			border-radius: 5px;
		}
		.product {
			margin-top: 40px;
			width: 500px;
		}
		h2 {
			font-size: 24px;
			color: #007bff;
		}
		p, #cart div {
			margin-top: 10px;
    		margin-bottom: 10px;
		}
		.name {
			width = auto;
		}
	</style>
</head>
<body>
	<div id="cart">
		<h2>Корзина</h2>
		<div>Товаров: <span class="items"></span></div>
		<div>Сумма: <span class="amount"></span></div>
		<a href="#" class="btn-clear">Очистить</a>
	</div>

	<div id="products">
		<?php foreach ( $products as $id => $product ) { ?>
		<div class="product product-<?php echo $id ?>"> 
			<p class="name" data-id='<?php echo $id ?>'><b><?php echo $product['name'] ?></b></p>
			<p>Цена : <span class="price"><?php echo $product['price'] ?></span>
			&bull; В корзине : <span class="count">0</span></p>
			<div class="btn">
				<a href="#" class="btn-add" data-id="<?php echo $id ?>">Купить</a>
				<a href="#" class="btn-remove" data-id="<?php echo $id ?>">Удалить</a>
			</div>
		</div>
		<?php } ?>

	</div>
</body>
</html>