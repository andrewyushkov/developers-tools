<?php
/**
 * Created by PhpStorm.
 * User: yushkov
 * Date: 20.09.2018
 * Time: 22:16
 *
 * Класс для
 */
class CLog {
    const LVL_NONE = 0;
    const LVL_ERROR = 1;
    const LVL_INFO = 2;
    const LVL_DEBUG = 3;
    const LVL_ALL = 999;


    public static function config($cfg) {
        $stopList = array('max_file_size', 'max_file_count');
        foreach (self::$cfg as $key => $val)
            if (array_key_exists($key, $cfg) and !in_array($key, $stopList))
                self::$cfg[$key] = $cfg[$key];
    }


    public static function error($message) {
        if (self::$cfg['log_level'] >= self::LVL_ERROR) self::write($message, 'ERROR');
    }
    public static function info($message) {
        if (self::$cfg['log_level'] >= self::LVL_INFO) self::write($message, 'INFO');
    }
    public static function debug($message) {
        if (self::$cfg['log_level'] >= self::LVL_DEBUG) self::write($message, 'DEBUG');
    }
    public static function console($message){
        $message = self::format($message, 'CONSOLE');
        echo '<pre>'.htmlentities($message).'</pre>';
    }
    public static function hr() {
        self::write("\n".str_repeat('=', 120)."\n", 'NULL');
    }
    public static function clrscr() {
        self::write(str_repeat("\n", 60), 'NULL');
    }
    public static function timegap($time, $precision=3) {
        $seconds = floor($time);
        $milliseconds = (string)round(($time - $seconds) * pow(10, $precision));
        while(strlen($milliseconds) < $precision) $milliseconds = '0'.$milliseconds;
        return "$seconds.$milliseconds";
    }


    //===========================================================================================
    //  Protected
    //===========================================================================================

    protected static $cfg = array(
        'log_level'  => self::LVL_DEBUG,   // one of self::LVL_...
        'path'   => '/tmp/.php_logging',  // log directory
        'fname'   => 'php.log',    // current log file name, later extended with .001, etc
        'module'  => 'default',    // module name for records identification
        'max_file_size' => 100000000,    // max log file size
        'max_file_count'=> 10,      // max rotating files count
    );


    protected static function format($message, $level){
        if (!is_string($message)) $message = print_r($message, True);

        $utimestamp = microtime(true);
        $timestamp = floor($utimestamp);
        $milliseconds = (string)round(($utimestamp - $timestamp) * 1000);
        while(strlen($milliseconds) < 3) $milliseconds = '0'.$milliseconds;

        $datetime = date('Y-m-d H:i:s', $timestamp).'.'.$milliseconds;
        $module = self::$cfg['module'];
        return "$datetime [$module.$level]: $message\n";
    }

    protected static function fname($lvl=0){
        $r = self::$cfg['path'].'/'.self::$cfg['fname'];
        if ($lvl) {
            $lvl = (string)$lvl;
            while(strlen($lvl) < 3) $lvl = '0'.$lvl;
            $r .= '.'.$lvl;
        }
        return $r;
    }

    protected static function rotate($lvl){
        $currentFName = self::fname($lvl);
        if ($lvl >= self::$cfg['max_file_count'] - 1) unlink($currentFName);
        else {
            $requiredFName = self::fname($lvl + 1);
            if (file_exists($requiredFName)) self::rotate($lvl + 1);
            rename($currentFName, $requiredFName);
        }
    }

    protected static function write($message, $level){
        $message = self::format($message, $level);

        if (!is_dir(self::$cfg['path'])) mkdir(self::$cfg['path'], 0777, true);
        $logFName = self::fname(0);

        if (file_exists($logFName) && filesize($logFName) + strlen($message) > self::$cfg['max_file_size'])
            self::rotate(0);

        $fout = fopen($logFName, 'a');
        fwrite($fout, $message);
        fclose($fout);
    }
}