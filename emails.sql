-- メールテーブル
CREATE TABLE public.emails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- メールID
    message_id TEXT UNIQUE, -- メールシステム固有のメッセージID (重複取込防止用)
    received_at TIMESTAMPTZ NOT NULL DEFAULT now(), -- 受信日時
    sender_address TEXT NOT NULL, -- 送信者メールアドレス
    recipient_address TEXT, -- 受信者メールアドレス
    subject TEXT, -- 件名
    body_text TEXT, -- メール本文 (テキスト形式)
    body_html TEXT, -- メール本文 (HTML形式)
    attachments_info JSONB, -- 添付ファイル情報 (ファイル名, S3キーなど)
    processing_status TEXT NOT NULL DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'processed_project_created', 'processed_engineer_created', 'processed_no_relevant_info', 'error_parsing', 'manual_review_required')), -- 処理ステータス
    extracted_project_id UUID REFERENCES public.projects(id), -- 抽出された案件ID
    extracted_engineer_id UUID REFERENCES public.engineers(id), -- 抽出された技術者ID
    error_message TEXT, -- エラーメッセージ (処理失敗時)
    notes TEXT, -- 処理に関するメモ
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now() -- 更新日時
);

-- コメント追加
COMMENT ON TABLE public.emails IS 'メールテーブル';
COMMENT ON COLUMN public.emails.id IS 'メールID';
COMMENT ON COLUMN public.emails.message_id IS 'メールシステム固有のメッセージID (重複取込防止用)';
COMMENT ON COLUMN public.emails.received_at IS '受信日時';
COMMENT ON COLUMN public.emails.sender_address IS '送信者メールアドレス';
COMMENT ON COLUMN public.emails.recipient_address IS '受信者メールアドレス';
COMMENT ON COLUMN public.emails.subject IS '件名';
COMMENT ON COLUMN public.emails.body_text IS 'メール本文 (テキスト形式)';
COMMENT ON COLUMN public.emails.body_html IS 'メール本文 (HTML形式)';
COMMENT ON COLUMN public.emails.attachments_info IS '添付ファイル情報 (ファイル名, S3キーなど)';
COMMENT ON COLUMN public.emails.processing_status IS '処理ステータス';
COMMENT ON COLUMN public.emails.extracted_project_id IS '抽出された案件ID';
COMMENT ON COLUMN public.emails.extracted_engineer_id IS '抽出された技術者ID';
COMMENT ON COLUMN public.emails.error_message IS 'エラーメッセージ (処理失敗時)';
COMMENT ON COLUMN public.emails.notes IS '処理に関するメモ';
COMMENT ON COLUMN public.emails.created_at IS '作成日時';
COMMENT ON COLUMN public.emails.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_emails_received_at ON public.emails(received_at);
CREATE INDEX idx_emails_sender_address ON public.emails(sender_address);
CREATE INDEX idx_emails_recipient_address ON public.emails(recipient_address);
CREATE INDEX idx_emails_processing_status ON public.emails(processing_status);
CREATE INDEX idx_emails_extracted_project_id ON public.emails(extracted_project_id);
CREATE INDEX idx_emails_extracted_engineer_id ON public.emails(extracted_engineer_id);

-- updated_at トリガー (既に trigger_set_timestamp() 関数が定義されていると仮定)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.emails
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
