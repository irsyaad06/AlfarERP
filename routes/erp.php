<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('erp')->name('erp.')->group(function (): void {
    Route::get('/', fn () => Inertia::render('erp/Workspace', [
        'initialModule' => 'dashboard',
        'initialPage' => 'dashboard',
    ]))->name('index');

    Route::get('/{page}', fn (string $page) => Inertia::render('erp/Workspace', [
        'initialModule' => 'dashboard',
        'initialPage' => $page,
    ]))->name('page');

    Route::get('/{module}/{page}', fn (string $module, string $page) => Inertia::render('erp/Workspace', [
        'initialModule' => $module,
        'initialPage' => $page,
    ]))->name('module.page');
});
