<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitaba350abaabb47e92c990e3081f2c0ae
{
    public static $files = array (
        'a2c48002d05f7782d8b603bd2bcb5252' => __DIR__ . '/..' . '/johnbillion/extended-cpts/extended-cpts.php',
    );

    public static $prefixLengthsPsr4 = array (
        'E' => 
        array (
            'ExtCPTs\\Tests\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ExtCPTs\\Tests\\' => 
        array (
            0 => __DIR__ . '/..' . '/johnbillion/extended-cpts/tests/phpunit',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitaba350abaabb47e92c990e3081f2c0ae::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitaba350abaabb47e92c990e3081f2c0ae::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}