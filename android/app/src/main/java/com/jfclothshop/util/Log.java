package com.jfclothshop.util;

public class Log {

    private static String TAG = Log.class.getCanonicalName();
//    private static int LOG_LEVEL = getInt("persist.sys.loglevel", 1);
    private static int LOG_LEVEL = 5;

    public static void setLogLevel(int level) {
//        set("persist.sys.loglevel", String.valueOf(level));
//        // LOG_LEVEL = getInt("persist.sys.loglevel", level);
//        LOG_LEVEL = level;
//        android.util.Log.d(TAG, "change log level to : " + LOG_LEVEL);
//        vapi.vsip_set_log(null, LOG_LEVEL, LOG_LEVEL);

    }

    public static int getLogLevel() {
        if (LOG_LEVEL > 5)
            LOG_LEVEL = 5;
        return LOG_LEVEL;
    }

    public static void v(String tag, String msg) {
        if (LOG_LEVEL >= 5) {
            android.util.Log.v(tag, msg);
        }
    }

    public static void v(String tag, String msg, Throwable tr) {
        if (LOG_LEVEL >= 5) {
            android.util.Log.v(tag, msg, tr);
        }
    }

    public static void d(String tag, String msg) {
        if (LOG_LEVEL >= 4) {
            android.util.Log.d(tag, msg);
        }
    }

    public static void d(String tag, String msg, Throwable tr) {
        if (LOG_LEVEL >= 4) {
            android.util.Log.d(tag, msg, tr);
        }
    }

    public static void i(String tag, String msg) {
        if (LOG_LEVEL >= 3) {
            android.util.Log.i(tag, msg);
        }
    }

    static void i(String tag, String msg, Throwable tr) {
        if (LOG_LEVEL >= 3) {
            android.util.Log.i(tag, msg, tr);
        }
    }

    public static void w(String tag, String msg) {
        if (LOG_LEVEL >= 2) {
            android.util.Log.w(tag, msg);
        }
    }

    public static void w(String tag, String msg, Throwable tr) {
        if (LOG_LEVEL >= 2) {
            android.util.Log.w(tag, msg, tr);
        }
    }

    public static void e(String tag, String msg) {
        if (LOG_LEVEL >= 1) {
            android.util.Log.e(tag, msg);
        }
    }

    public static void e(String tag, String msg, Throwable tr) {
        if (LOG_LEVEL >= 1) {
            android.util.Log.e(tag, msg, tr);
        }
    }

//    public static String get(String key) {
//        init();
//
//        String nextLevelValue = null;
//
//        try {
//            nextLevelValue = (String) mGetMethod.invoke(mClassType, key);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return nextLevelValue;
//    }

    public static void set(String key, String value) {
//        init();
//        android.util.Log.e(TAG, "[" + key + "][" + nextLevelValue + "]");
//        try {
//            mSetMethod.invoke(mClassType, key, nextLevelValue);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

//    public static int getInt(String key, int def) {
//        init();
//
//        int nextLevelValue = def;
//        try {
//            Integer v = (Integer) mGetIntMethod.invoke(mClassType, key, def);
//            nextLevelValue = v.intValue();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return nextLevelValue;
//    }
//
//    public static boolean getBoolean(String key, boolean def) {
//        init();
//
//        boolean nextLevelValue = def;
//        try {
//            Boolean v = (Boolean) mGetBooleanMethod
//                    .invoke(mClassType, key, def);
//            nextLevelValue = v.booleanValue();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return nextLevelValue;
//    }

//    private static Class<?> mClassType = null;
//    private static Method mGetMethod = null;
//    private static Method mGetIntMethod = null;
//    private static Method mGetBooleanMethod = null;
//    private static Method mSetMethod = null;
//
//    private static void init() {
//        try {
//            if (mClassType == null) {
//                mClassType = Class.forName("android.os.SystemProperties");
//
//                mGetMethod = mClassType.getDeclaredMethod("get", String.class);
//                mGetIntMethod = mClassType.getDeclaredMethod("getInt",
//                        String.class, int.class);
//                mGetBooleanMethod = mClassType.getDeclaredMethod("getBoolean",
//                        String.class, boolean.class);
//                mSetMethod = mClassType.getDeclaredMethod("set", String.class,
//                        String.class);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

}