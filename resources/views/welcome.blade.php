<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Movie App</title>
    <link rel="stylesheet" href="{{asset("css/app.css")}}">
</head>
<body class="antialiased">
    <div id="app">
        <app></app>
    </div>
    
</body>
<script src="{{asset("js/app.js")}}"></script>
</html>
