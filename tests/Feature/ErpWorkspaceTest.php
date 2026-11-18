<?php

use Inertia\Testing\AssertableInertia as Assert;

test('home renders alfar erp workspace', function () {
    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
        );
});

test('erp root route renders workspace with dashboard defaults', function () {
    $response = $this->get(route('erp.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('erp/Workspace')
            ->where('initialModule', 'dashboard')
            ->where('initialPage', 'dashboard')
        );
});

test('erp module and page route passes initial module and page props', function () {
    $response = $this->get(route('erp.module.page', [
        'module' => 'orders',
        'page' => 'poInput',
    ]));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('erp/Workspace')
            ->where('initialModule', 'orders')
            ->where('initialPage', 'poInput')
        );
});

test('alfar erp login page renders cleanly', function () {
    $response = $this->get(route('login'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('auth/Login')
        );
});
