<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Movie App</title>
    <link rel="stylesheet" href="{{secure_asset("css/app.css")}}">
</head>
<body class="antialiased">
    <div id="app">
        <app></app>
    </div>
    
</body>
<script src="{{secure_asset("js/app.js")}}"></script>
</html>
