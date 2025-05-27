-- システム設定テーブル
CREATE TABLE public.system_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 設定ID
    key TEXT UNIQUE NOT NULL, -- 設定キー (例: "email_batch_interval_minutes")
    value TEXT NOT NULL, -- 設定値
    description TEXT, -- 設定内容の説明
    value_type TEXT NOT NULL DEFAULT 'string' CHECK (value_type IN ('string', 'integer', 'float', 'boolean', 'json')), -- 値のデータ型 (文字列, 整数, 浮動小数点数, 真偽値, JSON)
    is_enabled BOOLEAN NOT NULL DEFAULT true, -- 有効フラグ (この設定が有効かどうか)
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now() -- 更新日時
);

-- コメント追加
COMMENT ON TABLE public.system_configurations IS 'システム設定テーブル';
COMMENT ON COLUMN public.system_configurations.id IS '設定ID';
COMMENT ON COLUMN public.system_configurations.key IS '設定キー (例: "email_batch_interval_minutes")';
COMMENT ON COLUMN public.system_configurations.value IS '設定値';
COMMENT ON COLUMN public.system_configurations.description IS '設定内容の説明';
COMMENT ON COLUMN public.system_configurations.value_type IS '値のデータ型 (文字列, 整数, 浮動小数点数, 真偽値, JSON)';
COMMENT ON COLUMN public.system_configurations.is_enabled IS '有効フラグ (この設定が有効かどうか)';
COMMENT ON COLUMN public.system_configurations.created_at IS '作成日時';
COMMENT ON COLUMN public.system_configurations.updated_at IS '更新日時';

-- インデックス作成
-- key は UNIQUE constraint により自動的にインデックスが作成されますが、明示的に定義することも可能です。
-- CREATE UNIQUE INDEX idx_system_configurations_key ON public.system_configurations(key);
CREATE INDEX idx_system_configurations_is_enabled ON public.system_configurations(is_enabled);

-- updated_at トリガー (既に trigger_set_timestamp() 関数が定義されていると仮定)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.system_configurations
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
